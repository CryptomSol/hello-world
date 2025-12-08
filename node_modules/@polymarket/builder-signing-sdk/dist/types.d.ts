export declare enum BuilderType {
    UNAVAILABLE = "UNAVAILABLE",
    LOCAL = "LOCAL",
    REMOTE = "REMOTE"
}
export interface BuilderApiKeyCreds {
    key: string;
    secret: string;
    passphrase: string;
}
export interface RemoteBuilderConfig {
    url: string;
    token?: string;
}
export interface RemoteSignerPayload {
    method: string;
    path: string;
    body?: string;
    timestamp?: number;
}
export interface BuilderHeaderPayload {
    POLY_BUILDER_API_KEY: string;
    POLY_BUILDER_TIMESTAMP: string;
    POLY_BUILDER_PASSPHRASE: string;
    POLY_BUILDER_SIGNATURE: string;
    [key: string]: string;
}
