"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderConfig = void 0;
const signer_1 = require("./signer");
const http_helpers_1 = require("./http-helpers");
const types_1 = require("./types");
class BuilderConfig {
    remoteBuilderConfig;
    localBuilderCreds;
    signer;
    constructor(config) {
        if (config) {
            if (config.remoteBuilderConfig !== undefined) {
                if (!BuilderConfig.hasValidRemoteUrl(config.remoteBuilderConfig.url)) {
                    throw new Error("invalid remote url!");
                }
                if (config.remoteBuilderConfig.token !== undefined) {
                    const tk = config.remoteBuilderConfig.token;
                    if (tk.length === 0) {
                        throw new Error("invalid auth token");
                    }
                }
                this.remoteBuilderConfig = config.remoteBuilderConfig;
            }
            if (config.localBuilderCreds !== undefined) {
                if (!BuilderConfig.hasValidLocalCreds(config.localBuilderCreds)) {
                    throw new Error("invalid local builder credentials!");
                }
                this.localBuilderCreds = config.localBuilderCreds;
                this.signer = new signer_1.BuilderSigner(config.localBuilderCreds);
            }
        }
    }
    /**
     * Helper function to generate builder headers using the configured credential method
     * @param method
     * @param path
     * @param body
     */
    async generateBuilderHeaders(method, path, body, timestamp) {
        this.ensureValid();
        const builderType = this.getBuilderType();
        if (builderType == types_1.BuilderType.LOCAL) {
            return Promise.resolve(this.signer?.createBuilderHeaderPayload(method, path, body, timestamp));
        }
        if (builderType == types_1.BuilderType.REMOTE) {
            const url = this.remoteBuilderConfig.url;
            // Execute a POST to the remote signer url with the header arguments
            const payload = {
                method: method,
                path: path,
                body: body,
                timestamp: timestamp,
            };
            try {
                const token = this.remoteBuilderConfig.token;
                return await (0, http_helpers_1.post)(url, {
                    data: payload,
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });
            }
            catch (err) {
                console.error("error calling remote signer", err);
                return undefined;
            }
        }
        return undefined;
    }
    isValid() {
        return this.getBuilderType() !== types_1.BuilderType.UNAVAILABLE;
    }
    getBuilderType() {
        const local = this.localBuilderCreds;
        const remote = this.remoteBuilderConfig;
        if (local && remote) {
            // If both present, prefer local
            return types_1.BuilderType.LOCAL;
        }
        if (local) {
            return types_1.BuilderType.LOCAL;
        }
        if (remote) {
            return types_1.BuilderType.REMOTE;
        }
        return types_1.BuilderType.UNAVAILABLE;
    }
    static hasValidLocalCreds(creds) {
        if (!creds)
            return false;
        const { key, secret, passphrase } = creds;
        if (!key.trim())
            return false;
        if (!secret.trim())
            return false;
        if (!passphrase.trim())
            return false;
        return true;
    }
    static hasValidRemoteUrl(remoteUrl) {
        if (!remoteUrl?.trim())
            return false;
        return remoteUrl.startsWith("http://") || remoteUrl.startsWith("https://");
    }
    ensureValid() {
        if (this.getBuilderType() === types_1.BuilderType.UNAVAILABLE) {
            throw new Error("invalid builder creds configured!");
        }
    }
}
exports.BuilderConfig = BuilderConfig;
//# sourceMappingURL=config.js.map