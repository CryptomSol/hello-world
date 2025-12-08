"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderSigner = void 0;
const signing_1 = require("./signing");
class BuilderSigner {
    creds;
    constructor(creds) {
        this.creds = creds;
    }
    createBuilderHeaderPayload(method, path, body, timestamp) {
        let ts = Math.floor(Date.now() / 1000);
        if (timestamp !== undefined) {
            ts = timestamp;
        }
        const builderSig = (0, signing_1.buildHmacSignature)(this.creds.secret, ts, method, path, body);
        return {
            POLY_BUILDER_API_KEY: this.creds.key,
            POLY_BUILDER_PASSPHRASE: this.creds.passphrase,
            POLY_BUILDER_SIGNATURE: builderSig,
            POLY_BUILDER_TIMESTAMP: `${ts}`,
        };
    }
}
exports.BuilderSigner = BuilderSigner;
//# sourceMappingURL=signer.js.map