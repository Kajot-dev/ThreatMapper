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
import type { ModelBasicNode } from './ModelBasicNode';
import {
    ModelBasicNodeFromJSON,
    ModelBasicNodeFromJSONTyped,
    ModelBasicNodeToJSON,
} from './ModelBasicNode';

/**
 * 
 * @export
 * @interface ModelSecret
 */
export interface ModelSecret {
    /**
     * 
     * @type {string}
     * @memberof ModelSecret
     */
    full_filename: string;
    /**
     * 
     * @type {string}
     * @memberof ModelSecret
     */
    level: string;
    /**
     * 
     * @type {boolean}
     * @memberof ModelSecret
     */
    masked: boolean;
    /**
     * 
     * @type {string}
     * @memberof ModelSecret
     */
    matched_content: string;
    /**
     * 
     * @type {string}
     * @memberof ModelSecret
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ModelSecret
     */
    node_id: string;
    /**
     * 
     * @type {string}
     * @memberof ModelSecret
     */
    part: string;
    /**
     * 
     * @type {number}
     * @memberof ModelSecret
     */
    relative_ending_index: number;
    /**
     * 
     * @type {number}
     * @memberof ModelSecret
     */
    relative_starting_index: number;
    /**
     * 
     * @type {Array<ModelBasicNode>}
     * @memberof ModelSecret
     */
    resources?: Array<ModelBasicNode> | null;
    /**
     * 
     * @type {number}
     * @memberof ModelSecret
     */
    rule_id: number;
    /**
     * 
     * @type {number}
     * @memberof ModelSecret
     */
    score: number;
    /**
     * 
     * @type {string}
     * @memberof ModelSecret
     */
    signature_to_match: string;
    /**
     * 
     * @type {number}
     * @memberof ModelSecret
     */
    starting_index: number;
    /**
     * 
     * @type {number}
     * @memberof ModelSecret
     */
    updated_at: number;
}

/**
 * Check if a given object implements the ModelSecret interface.
 */
export function instanceOfModelSecret(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "full_filename" in value;
    isInstance = isInstance && "level" in value;
    isInstance = isInstance && "masked" in value;
    isInstance = isInstance && "matched_content" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "node_id" in value;
    isInstance = isInstance && "part" in value;
    isInstance = isInstance && "relative_ending_index" in value;
    isInstance = isInstance && "relative_starting_index" in value;
    isInstance = isInstance && "rule_id" in value;
    isInstance = isInstance && "score" in value;
    isInstance = isInstance && "signature_to_match" in value;
    isInstance = isInstance && "starting_index" in value;
    isInstance = isInstance && "updated_at" in value;

    return isInstance;
}

export function ModelSecretFromJSON(json: any): ModelSecret {
    return ModelSecretFromJSONTyped(json, false);
}

export function ModelSecretFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelSecret {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'full_filename': json['full_filename'],
        'level': json['level'],
        'masked': json['masked'],
        'matched_content': json['matched_content'],
        'name': json['name'],
        'node_id': json['node_id'],
        'part': json['part'],
        'relative_ending_index': json['relative_ending_index'],
        'relative_starting_index': json['relative_starting_index'],
        'resources': !exists(json, 'resources') ? undefined : (json['resources'] === null ? null : (json['resources'] as Array<any>).map(ModelBasicNodeFromJSON)),
        'rule_id': json['rule_id'],
        'score': json['score'],
        'signature_to_match': json['signature_to_match'],
        'starting_index': json['starting_index'],
        'updated_at': json['updated_at'],
    };
}

export function ModelSecretToJSON(value?: ModelSecret | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'full_filename': value.full_filename,
        'level': value.level,
        'masked': value.masked,
        'matched_content': value.matched_content,
        'name': value.name,
        'node_id': value.node_id,
        'part': value.part,
        'relative_ending_index': value.relative_ending_index,
        'relative_starting_index': value.relative_starting_index,
        'resources': value.resources === undefined ? undefined : (value.resources === null ? null : (value.resources as Array<any>).map(ModelBasicNodeToJSON)),
        'rule_id': value.rule_id,
        'score': value.score,
        'signature_to_match': value.signature_to_match,
        'starting_index': value.starting_index,
        'updated_at': value.updated_at,
    };
}

