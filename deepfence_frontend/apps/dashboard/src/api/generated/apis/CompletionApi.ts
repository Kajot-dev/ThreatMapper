/* tslint:disable */
/* eslint-disable */
/**
 * Deepfence ThreatMapper
 * Deepfence Runtime API provides programmatic control over Deepfence microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: community@deepfence.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ApiDocsBadRequestResponse,
  ApiDocsFailureResponse,
  CompletionCompletionNodeFieldReq,
  CompletionCompletionNodeFieldRes,
} from '../models';
import {
    ApiDocsBadRequestResponseFromJSON,
    ApiDocsBadRequestResponseToJSON,
    ApiDocsFailureResponseFromJSON,
    ApiDocsFailureResponseToJSON,
    CompletionCompletionNodeFieldReqFromJSON,
    CompletionCompletionNodeFieldReqToJSON,
    CompletionCompletionNodeFieldResFromJSON,
    CompletionCompletionNodeFieldResToJSON,
} from '../models';

export interface CompleteHostInfoRequest {
    completionCompletionNodeFieldReq?: CompletionCompletionNodeFieldReq;
}

export interface CompleteProcessInfoRequest {
    completionCompletionNodeFieldReq?: CompletionCompletionNodeFieldReq;
}

export interface CompleteVulnerabilityInfoRequest {
    completionCompletionNodeFieldReq?: CompletionCompletionNodeFieldReq;
}

/**
 * CompletionApi - interface
 * 
 * @export
 * @interface CompletionApiInterface
 */
export interface CompletionApiInterface {
    /**
     * Complete host info
     * @summary Get Completion for host fields
     * @param {CompletionCompletionNodeFieldReq} [completionCompletionNodeFieldReq] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CompletionApiInterface
     */
    completeHostInfoRaw(requestParameters: CompleteHostInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CompletionCompletionNodeFieldRes>>;

    /**
     * Complete host info
     * Get Completion for host fields
     */
    completeHostInfo(requestParameters: CompleteHostInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CompletionCompletionNodeFieldRes>;

    /**
     * Complete process info
     * @summary Get Completion for process fields
     * @param {CompletionCompletionNodeFieldReq} [completionCompletionNodeFieldReq] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CompletionApiInterface
     */
    completeProcessInfoRaw(requestParameters: CompleteProcessInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CompletionCompletionNodeFieldRes>>;

    /**
     * Complete process info
     * Get Completion for process fields
     */
    completeProcessInfo(requestParameters: CompleteProcessInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CompletionCompletionNodeFieldRes>;

    /**
     * Complete vulnerability info
     * @summary Get Completion for vulnerability fields
     * @param {CompletionCompletionNodeFieldReq} [completionCompletionNodeFieldReq] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CompletionApiInterface
     */
    completeVulnerabilityInfoRaw(requestParameters: CompleteVulnerabilityInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CompletionCompletionNodeFieldRes>>;

    /**
     * Complete vulnerability info
     * Get Completion for vulnerability fields
     */
    completeVulnerabilityInfo(requestParameters: CompleteVulnerabilityInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CompletionCompletionNodeFieldRes>;

}

/**
 * 
 */
export class CompletionApi extends runtime.BaseAPI implements CompletionApiInterface {

    /**
     * Complete host info
     * Get Completion for host fields
     */
    async completeHostInfoRaw(requestParameters: CompleteHostInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CompletionCompletionNodeFieldRes>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/complete/host`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CompletionCompletionNodeFieldReqToJSON(requestParameters.completionCompletionNodeFieldReq),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CompletionCompletionNodeFieldResFromJSON(jsonValue));
    }

    /**
     * Complete host info
     * Get Completion for host fields
     */
    async completeHostInfo(requestParameters: CompleteHostInfoRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CompletionCompletionNodeFieldRes> {
        const response = await this.completeHostInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Complete process info
     * Get Completion for process fields
     */
    async completeProcessInfoRaw(requestParameters: CompleteProcessInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CompletionCompletionNodeFieldRes>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/complete/process`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CompletionCompletionNodeFieldReqToJSON(requestParameters.completionCompletionNodeFieldReq),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CompletionCompletionNodeFieldResFromJSON(jsonValue));
    }

    /**
     * Complete process info
     * Get Completion for process fields
     */
    async completeProcessInfo(requestParameters: CompleteProcessInfoRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CompletionCompletionNodeFieldRes> {
        const response = await this.completeProcessInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Complete vulnerability info
     * Get Completion for vulnerability fields
     */
    async completeVulnerabilityInfoRaw(requestParameters: CompleteVulnerabilityInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CompletionCompletionNodeFieldRes>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/complete/vulnerability`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CompletionCompletionNodeFieldReqToJSON(requestParameters.completionCompletionNodeFieldReq),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CompletionCompletionNodeFieldResFromJSON(jsonValue));
    }

    /**
     * Complete vulnerability info
     * Get Completion for vulnerability fields
     */
    async completeVulnerabilityInfo(requestParameters: CompleteVulnerabilityInfoRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CompletionCompletionNodeFieldRes> {
        const response = await this.completeVulnerabilityInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

}