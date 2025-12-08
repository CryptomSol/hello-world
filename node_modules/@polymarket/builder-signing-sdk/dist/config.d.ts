import { BuilderSigner } from "./signer";
import { BuilderApiKeyCreds, BuilderHeaderPayload, BuilderType, RemoteBuilderConfig } from "./types";
export declare class BuilderConfig {
    readonly remoteBuilderConfig?: RemoteBuilderConfig;
    readonly localBuilderCreds?: BuilderApiKeyCreds;
    readonly signer?: BuilderSigner;
    constructor(config?: {
        remoteBuilderConfig?: RemoteBuilderConfig;
        localBuilderCreds?: BuilderApiKeyCreds;
    });
    /**
     * Helper function to generate builder headers using the configured credential method
     * @param method
     * @param path
     * @param body
     */
    generateBuilderHeaders(method: string, path: string, body?: string, timestamp?: number): Promise<BuilderHeaderPayload | undefined>;
    isValid(): boolean;
    getBuilderType(): BuilderType;
    private static hasValidLocalCreds;
    private static hasValidRemoteUrl;
    private ensureValid;
}
