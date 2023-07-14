import { Suspense, useState } from 'react';
import { cn } from 'tailwind-preset';
import { Breadcrumb, BreadcrumbLink, Button, Card, Separator } from 'ui-components';

import { DFLink } from '@/components/DFLink';
import { DownloadReportIcon } from '@/components/icons/integration/DownloadReport';
import { ElasticsearchIcon } from '@/components/icons/integration/Elasticsearch';
import { EmailIcon } from '@/components/icons/integration/Email';
import { GoogleChronicleIcon } from '@/components/icons/integration/GoogleChronicle';
import { HttpIcon } from '@/components/icons/integration/Http';
import { JiraIcon } from '@/components/icons/integration/Jira';
import { PagerDutyIcon } from '@/components/icons/integration/PagerDuty';
import { S3ArchivalIcon } from '@/components/icons/integration/S3Archival';
import { SlackIcon } from '@/components/icons/integration/Slack';
import { SplunkIcon } from '@/components/icons/integration/Splunk';
import { SumoLogicIcon } from '@/components/icons/integration/SumoLogic';
import { TeamsIcon } from '@/components/icons/integration/Teams';
import { AmazonECRRegistryIcon } from '@/components/icons/registries/AmazonEcr';
import { IntegrationsIcon } from '@/components/sideNavigation/icons/Integrations';
import { IntegrationType } from '@/features/integrations/components/IntegrationForm';
import { useGetReports } from '@/features/integrations/pages/DownloadReport';
import { usePageNavigation } from '@/utils/usePageNavigation';

import { useListIntegrations } from './IntegrationAdd';

export const integrationTypeToNameMapping: { [key: string]: string } = {
  slack: 'Slack',
  teams: 'Microsoft Teams',
  pagerduty: 'Pager Duty',
  http_endpoint: 'HTTP Endpoint',
  jira: 'Jira',
  s3: 'S3',
  splunk: 'Splunk',
  elasticsearch: 'Elasticsearch',
  sumologic: 'Sumo Logic',
  googlechronicle: 'Google Chronicle',
  aws_security_hub: 'AWS Security Hub',
  email: 'Email',
};

type Type = {
  name: string;
  id: string;
  icon: JSX.Element;
  path: string;
};

const IntegrationsData = [
  {
    name: 'Notification',
    types: [
      {
        name: integrationTypeToNameMapping[IntegrationType.slack],
        id: IntegrationType.slack,
        icon: <SlackIcon />,
        path: '/integrations/notifications/add/slack',
      },
      {
        name: integrationTypeToNameMapping[IntegrationType.microsoftTeams],
        id: IntegrationType.microsoftTeams,
        icon: <TeamsIcon />,
        path: '/integrations/notifications/add/teams',
      },
      {
        name: integrationTypeToNameMapping[IntegrationType.pagerDuty],
        id: IntegrationType.pagerDuty,
        icon: <PagerDutyIcon />,
        path: '/integrations/notifications/add/pagerduty',
      },
      {
        name: integrationTypeToNameMapping[IntegrationType.httpEndpoint],
        id: IntegrationType.httpEndpoint,
        icon: <HttpIcon />,
        path: '/integrations/notifications/add/http_endpoint',
      },
      {
        name: integrationTypeToNameMapping[IntegrationType.email],
        id: IntegrationType.email,
        icon: <EmailIcon />,
        path: '/integrations/notifications/add/email',
      },
    ],
  },
  {
    name: 'SIEM/SOAR',
    types: [
      {
        name: integrationTypeToNameMapping[IntegrationType.splunk],
        id: IntegrationType.splunk,
        icon: <SplunkIcon />,
        path: '/integrations/seim/add/splunk',
      },
      {
        name: integrationTypeToNameMapping[IntegrationType.elasticsearch],
        id: IntegrationType.elasticsearch,
        icon: <ElasticsearchIcon />,
        path: '/integrations/seim/add/elasticsearch',
      },
      {
        name: integrationTypeToNameMapping[IntegrationType.sumoLogic],
        id: IntegrationType.sumoLogic,
        icon: <SumoLogicIcon />,
        path: '/integrations/seim/add/sumologic',
      },
      {
        name: integrationTypeToNameMapping[IntegrationType.googleChronicle],
        id: IntegrationType.googleChronicle,
        icon: <GoogleChronicleIcon />,
        path: '/integrations/seim/add/googlechronicle',
      },
      {
        name: integrationTypeToNameMapping[IntegrationType.awsSecurityHub],
        id: IntegrationType.awsSecurityHub,
        icon: <AmazonECRRegistryIcon />,
        path: '/integrations/seim/add/aws_security_hub',
      },
    ],
  },
  {
    name: 'Ticketing',
    types: [
      {
        name: integrationTypeToNameMapping[IntegrationType.jira],
        id: IntegrationType.jira,
        icon: <JiraIcon />,
        path: '/integrations/ticketing/add/jira',
      },
    ],
  },
  {
    name: 'Archival',
    types: [
      {
        name: integrationTypeToNameMapping[IntegrationType.s3],
        id: IntegrationType.s3,
        icon: <S3ArchivalIcon />,
        path: '/integrations/archival/add/s3',
      },
    ],
  },
];

const Count = ({
  type,
  setError,
}: {
  type: Type;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const { data: list } = useListIntegrations();
  const { data = [], message } = list ?? {};

  if (message && message.length) {
    setError(message);
    throw new Error();
  }

  const len = data.filter(
    (integration) => integration.integration_type === type.id,
  ).length;
  return (
    <div className="flex items-center gap-x-2 mt-2">
      <span className="text-h1 dark:text-text-input-value">{len}</span>
      <span className="text-p4 dark:text-text-text-and-icon">
        {`Connection${len > 1 ? 's' : ''}`}
      </span>
    </div>
  );
};
const Type = ({
  type,
  setError,
}: {
  type: Type;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  return (
    <div className="flex flex-col">
      <h4 className="text-t4 uppercase dark:text-text-input-value">{type.name}</h4>

      <Suspense
        fallback={
          <div className="flex items-center gap-x-2 mt-2">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        }
      >
        <Count type={type} setError={setError} />
      </Suspense>
    </div>
  );
};
const Integrations = () => {
  const [error, setError] = useState<string>();

  return (
    <>
      <div className="dark:bg-bg-breadcrumb-bar py-2 px-4">
        <Breadcrumb>
          <BreadcrumbLink
            icon={<IntegrationsIcon />}
            className="dark:text-text-input-value"
          >
            Integrations
          </BreadcrumbLink>
        </Breadcrumb>
      </div>
      <div className="m-4 gap-y-6 flex flex-col">
        {IntegrationsData.map((integration) => {
          return (
            <section key={integration.name} className="flex flex-col">
              <h2 className="uppercase text-t3 dark:text-text-input-value">
                {integration.name}
              </h2>
              <div className="mt-2 flex flex-wrap gap-4">
                {integration?.types?.map((type) => {
                  return (
                    <DFLink to={type.path} unstyled key={type.name}>
                      <Card className="p-3 flex flex-col shrink-0 min-w-[208px] ring-inset dark:hover:ring-bg-hover-3 dark:hover:ring-2 dark:focus:ring-bg-hover-3 dark:focus:ring-2 cursor-pointer">
                        <div className="flex items-center gap-x-6">
                          <div className="dark:bg-bg-grid-default rounded-full p-3 flex justify-center items-center">
                            <span className="h-9 w-9">{type.icon}</span>
                          </div>
                          <Type setError={setError} type={type} />
                        </div>
                      </Card>
                    </DFLink>
                  );
                })}
              </div>
            </section>
          );
        })}
        <Separator className="dark:bg-bg-grid-border h-px w-full" />
        <DownloadReport />
      </div>
    </>
  );
};

const ReportCount = () => {
  const { data } = useGetReports();
  const reportCount = data?.data?.length ?? 0;

  return (
    <div className="flex gap-x-2 items-center">
      <span className="text-h1 dark:text-text-input-value">{reportCount}</span>

      <span className="text-p7">Reports generated</span>
    </div>
  );
};
const ReportCountSkeleton = () => {
  return (
    <div className="animate-pulse flex gap-x-2 items-center">
      <div className="dark:bg-bg-grid-default rounded-md">
        <div className="w-4 h-6"></div>
      </div>
      <div className="dark:bg-bg-grid-default rounded-md">
        <div className="w-16 h-2"></div>
      </div>
    </div>
  );
};
const DownloadReport = () => {
  const { navigate } = usePageNavigation();

  return (
    <div>
      <h2 className="uppercase text-t3 dark:text-text-input-value">Download reports</h2>
      <div className="mt-2 flex gap-x-4 items-center">
        <div className="flex flex-col w-fit min-w-[208px]">
          <DFLink to={'/integrations/download/report'} className="h-[84px]" unstyled>
            <Card
              className={cn(
                'p-3 flex shrink-0 items-center h-full gap-x-4',
                'dark:text-text-text-and-icon',
                'hover:outline dark:hover:outline-bg-hover-3 dark:hover:outline-2',
                'dark:focus:outline-bg-hover-3 dark:focus:outline-2 cursor-pointer',
              )}
            >
              <span className="h-9 w-9 ">
                <DownloadReportIcon />
              </span>
              <Suspense fallback={<ReportCountSkeleton />}>
                <ReportCount />
              </Suspense>
            </Card>
          </DFLink>
        </div>
        <Button
          className="self-center"
          size="md"
          type="button"
          onClick={() => {
            navigate('/integrations/download/report/create');
          }}
          startIcon={
            <span className="w-2 h-2 ">
              <DownloadReportIcon />
            </span>
          }
        >
          Create New Report
        </Button>
      </div>
    </div>
  );
};

export const module = {
  element: <Integrations />,
};