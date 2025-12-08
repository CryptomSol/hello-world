import { BuilderApiKeyCreds, BuilderHeaderPayload } from "./types";
export declare class BuilderSigner {
    readonly creds: BuilderApiKeyCreds;
    constructor(creds: BuilderApiKeyCreds);
    createBuilderHeaderPayload(method: string, path: string, body?: string, timestamp?: number): BuilderHeaderPayload;
}
