/* tslint:disable */
/* eslint-disable */
/**
 * Deepfence ThreatMapper
 * Deepfence Runtime API provides programmatic control over Deepfence microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.
 *
 * The version of the OpenAPI document: 2.2.0
 * Contact: community@deepfence.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ModelLoginRequest
 */
export interface ModelLoginRequest {
    /**
     * 
     * @type {string}
     * @memberof ModelLoginRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof ModelLoginRequest
     */
    password: string;
}

/**
 * Check if a given object implements the ModelLoginRequest interface.
 */
export function instanceOfModelLoginRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function ModelLoginRequestFromJSON(json: any): ModelLoginRequest {
    return ModelLoginRequestFromJSONTyped(json, false);
}

export function ModelLoginRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelLoginRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
    };
}

export function ModelLoginRequestToJSON(value?: ModelLoginRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
    };
}

