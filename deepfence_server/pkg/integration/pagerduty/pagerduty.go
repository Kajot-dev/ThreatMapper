package pagerduty

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/PagerDuty/go-pagerduty"
	"github.com/deepfence/ThreatMapper/deepfence_utils/log"
)

const (
	pagerDutyAPIEndpoint = "https://events.pagerduty.com/v2/enqueue"
	url                  = "https://api.pagerduty.com/services?include[]=integrations"
	BatchSize            = 100
)

var pagerdutySeverityMapping = map[string]string{
	"critical": "critical",
	"high":     "error",
	"medium":   "warning",
	"low":      "info",
	"info":     "info",
}

func New(b []byte) (*PagerDuty, error) {
	p := PagerDuty{}
	err := json.Unmarshal(b, &p)
	if err != nil {
		return &p, err
	}
	return &p, nil
}

func (p PagerDuty) SendNotification(ctx context.Context, message string, extras map[string]interface{}) error {
	if p.Config.APIKey == "" {
		log.Error().Msg("API key is empty")
		return nil
	}

	if p.Config.ServiceKey == "" {
		log.Error().Msg("Service key is empty")
		return nil
	}

	var msg []map[string]interface{}
	err := json.Unmarshal([]byte(message), &msg)
	if err != nil {
		return err
	}
	m := p.FormatMessage(msg)

	sev := pagerdutySeverityMapping[p.Severity]
	if sev == "" {
		sev = "info"
	}

	incident := pagerduty.V2Event{
		RoutingKey: p.Config.ServiceKey,
		Action:     "trigger",
		Payload: &pagerduty.V2Payload{
			Summary:  fmt.Sprintf("Deepfence - %s Subscription", p.Resource),
			Source:   "deepfence",
			Severity: sev,
			Details: map[string]string{
				"alert": m,
			},
		},
	}

	err = createPagerDutyEvent(p.Config.APIKey, incident)
	if err != nil {
		log.Error().Msgf("PagerDuty: %+v", err)
	}
	return nil
}

func createPagerDutyEvent(pagerDutyAPIToken string, event pagerduty.V2Event) error {
	payloadBytes, err := json.Marshal(event)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, pagerDutyAPIEndpoint, bytes.NewBuffer(payloadBytes))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Token token="+pagerDutyAPIToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusAccepted {
		return fmt.Errorf("unexpected response status: %s", resp.Status)
	}

	return nil
}

func (p PagerDuty) FormatMessage(message []map[string]interface{}) string {
	var msg string
	count := 1

	for _, m := range message {
		msg += fmt.Sprintf("%s #%d\n", p.Resource, count)
		for k, v := range m {
			msg += fmt.Sprintf("%s: %v\n", k, v)
		}
		msg += "\n\n"
		count++
	}
	return msg
}

// todo: implement this and make this method as part of the interface
// function that checks if the credential provided by the user is valid or not
func IsValidCreds(p PagerDuty) (bool, error) {
	var req *http.Request
	var err error

	req, err = http.NewRequest("POST", url, nil)
	if err != nil {
		return false, err
	}

	req.Header.Set("Authorization", "Token token="+p.Config.APIKey)
	req.Header.Set("Accept", "application/vnd.pagerduty+json;version=2")
	req.Header.Set("Content-Type", "application/json")

	// Make the HTTP request.
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == 200 {
		return true, nil
	}
	// todo: check response body for error message like invalid api key or something
	return false, nil
}