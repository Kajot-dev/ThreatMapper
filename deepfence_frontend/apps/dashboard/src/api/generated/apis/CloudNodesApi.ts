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
  ModelCloudNodeAccountRegisterReq,
  ModelCloudNodeAccountRegisterResp,
  ModelCloudNodeAccountsListReq,
  ModelCloudNodeAccountsListResp,
  ModelCloudNodeProvidersListResp,
  ModelCloudResourceDeployAgentReq,
  ModelMessageResponse,
} from '../models';
import {
    ApiDocsBadRequestResponseFromJSON,
    ApiDocsBadRequestResponseToJSON,
    ApiDocsFailureResponseFromJSON,
    ApiDocsFailureResponseToJSON,
    ModelCloudNodeAccountRegisterReqFromJSON,
    ModelCloudNodeAccountRegisterReqToJSON,
    ModelCloudNodeAccountRegisterRespFromJSON,
    ModelCloudNodeAccountRegisterRespToJSON,
    ModelCloudNodeAccountsListReqFromJSON,
    ModelCloudNodeAccountsListReqToJSON,
    ModelCloudNodeAccountsListRespFromJSON,
    ModelCloudNodeAccountsListRespToJSON,
    ModelCloudNodeProvidersListRespFromJSON,
    ModelCloudNodeProvidersListRespToJSON,
    ModelCloudResourceDeployAgentReqFromJSON,
    ModelCloudResourceDeployAgentReqToJSON,
    ModelMessageResponseFromJSON,
    ModelMessageResponseToJSON,
} from '../models';

export interface DeployCloudResourceAgentRequest {
    modelCloudResourceDeployAgentReq?: ModelCloudResourceDeployAgentReq;
}

export interface ListCloudNodeAccountRequest {
    modelCloudNodeAccountsListReq?: ModelCloudNodeAccountsListReq;
}

export interface RegisterCloudNodeAccountRequest {
    modelCloudNodeAccountRegisterReq?: ModelCloudNodeAccountRegisterReq;
}

/**
 * CloudNodesApi - interface
 * 
 * @export
 * @interface CloudNodesApiInterface
 */
export interface CloudNodesApiInterface {
    /**
     * Deploy Agent on Cloud Resource eligible for agent deployment
     * @summary Deploy Agent on Cloud Resource
     * @param {ModelCloudResourceDeployAgentReq} [modelCloudResourceDeployAgentReq] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CloudNodesApiInterface
     */
    deployCloudResourceAgentRaw(requestParameters: DeployCloudResourceAgentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelMessageResponse>>;

    /**
     * Deploy Agent on Cloud Resource eligible for agent deployment
     * Deploy Agent on Cloud Resource
     */
    deployCloudResourceAgent(requestParameters: DeployCloudResourceAgentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelMessageResponse>;

    /**
     * List Cloud Node Accounts registered with the console
     * @summary List Cloud Node Accounts
     * @param {ModelCloudNodeAccountsListReq} [modelCloudNodeAccountsListReq] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CloudNodesApiInterface
     */
    listCloudNodeAccountRaw(requestParameters: ListCloudNodeAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelCloudNodeAccountsListResp>>;

    /**
     * List Cloud Node Accounts registered with the console
     * List Cloud Node Accounts
     */
    listCloudNodeAccount(requestParameters: ListCloudNodeAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelCloudNodeAccountsListResp>;

    /**
     * List Cloud Node Providers registered with the console
     * @summary List Cloud Node Providers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CloudNodesApiInterface
     */
    listCloudProvidersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelCloudNodeProvidersListResp>>;

    /**
     * List Cloud Node Providers registered with the console
     * List Cloud Node Providers
     */
    listCloudProviders(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelCloudNodeProvidersListResp>;

    /**
     * Register Cloud Node Account and return any pending compliance scans from console
     * @summary Register Cloud Node Account
     * @param {ModelCloudNodeAccountRegisterReq} [modelCloudNodeAccountRegisterReq] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CloudNodesApiInterface
     */
    registerCloudNodeAccountRaw(requestParameters: RegisterCloudNodeAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelCloudNodeAccountRegisterResp>>;

    /**
     * Register Cloud Node Account and return any pending compliance scans from console
     * Register Cloud Node Account
     */
    registerCloudNodeAccount(requestParameters: RegisterCloudNodeAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelCloudNodeAccountRegisterResp>;

}

/**
 * 
 */
export class CloudNodesApi extends runtime.BaseAPI implements CloudNodesApiInterface {

    /**
     * Deploy Agent on Cloud Resource eligible for agent deployment
     * Deploy Agent on Cloud Resource
     */
    async deployCloudResourceAgentRaw(requestParameters: DeployCloudResourceAgentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelMessageResponse>> {
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
            path: `/deepfence/cloud-resource/deploy-agent`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ModelCloudResourceDeployAgentReqToJSON(requestParameters.modelCloudResourceDeployAgentReq),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelMessageResponseFromJSON(jsonValue));
    }

    /**
     * Deploy Agent on Cloud Resource eligible for agent deployment
     * Deploy Agent on Cloud Resource
     */
    async deployCloudResourceAgent(requestParameters: DeployCloudResourceAgentRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelMessageResponse> {
        const response = await this.deployCloudResourceAgentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List Cloud Node Accounts registered with the console
     * List Cloud Node Accounts
     */
    async listCloudNodeAccountRaw(requestParameters: ListCloudNodeAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelCloudNodeAccountsListResp>> {
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
            path: `/deepfence/cloud-node/list/accounts`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ModelCloudNodeAccountsListReqToJSON(requestParameters.modelCloudNodeAccountsListReq),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelCloudNodeAccountsListRespFromJSON(jsonValue));
    }

    /**
     * List Cloud Node Accounts registered with the console
     * List Cloud Node Accounts
     */
    async listCloudNodeAccount(requestParameters: ListCloudNodeAccountRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelCloudNodeAccountsListResp> {
        const response = await this.listCloudNodeAccountRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List Cloud Node Providers registered with the console
     * List Cloud Node Providers
     */
    async listCloudProvidersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelCloudNodeProvidersListResp>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/cloud-node/list/providers`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelCloudNodeProvidersListRespFromJSON(jsonValue));
    }

    /**
     * List Cloud Node Providers registered with the console
     * List Cloud Node Providers
     */
    async listCloudProviders(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelCloudNodeProvidersListResp> {
        const response = await this.listCloudProvidersRaw(initOverrides);
        return await response.value();
    }

    /**
     * Register Cloud Node Account and return any pending compliance scans from console
     * Register Cloud Node Account
     */
    async registerCloudNodeAccountRaw(requestParameters: RegisterCloudNodeAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelCloudNodeAccountRegisterResp>> {
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
            path: `/deepfence/cloud-node/account`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ModelCloudNodeAccountRegisterReqToJSON(requestParameters.modelCloudNodeAccountRegisterReq),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelCloudNodeAccountRegisterRespFromJSON(jsonValue));
    }

    /**
     * Register Cloud Node Account and return any pending compliance scans from console
     * Register Cloud Node Account
     */
    async registerCloudNodeAccount(requestParameters: RegisterCloudNodeAccountRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelCloudNodeAccountRegisterResp> {
        const response = await this.registerCloudNodeAccountRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
