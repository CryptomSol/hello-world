"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectBuilderHeaders = exports.createL2Headers = exports.createL1Headers = void 0;
const tslib_1 = require("tslib");
const signing_1 = require("../signing");
const createL1Headers = (signer, chainId, nonce, timestamp) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let ts = Math.floor(Date.now() / 1000);
    if (timestamp !== undefined) {
        ts = timestamp;
    }
    let n = 0; // Default nonce is 0
    if (nonce !== undefined) {
        n = nonce;
    }
    const sig = yield (0, signing_1.buildClobEip712Signature)(signer, chainId, ts, n);
    const address = yield signer.getAddress();
    const headers = {
        POLY_ADDRESS: address,
        POLY_SIGNATURE: sig,
        POLY_TIMESTAMP: `${ts}`,
        POLY_NONCE: `${n}`,
    };
    return headers;
});
exports.createL1Headers = createL1Headers;
const createL2Headers = (signer, creds, l2HeaderArgs, timestamp) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let ts = Math.floor(Date.now() / 1000);
    if (timestamp !== undefined) {
        ts = timestamp;
    }
    const address = yield signer.getAddress();
    const sig = (0, signing_1.buildPolyHmacSignature)(creds.secret, ts, l2HeaderArgs.method, l2HeaderArgs.requestPath, l2HeaderArgs.body);
    const headers = {
        POLY_ADDRESS: address,
        POLY_SIGNATURE: sig,
        POLY_TIMESTAMP: `${ts}`,
        POLY_API_KEY: creds.key,
        POLY_PASSPHRASE: creds.passphrase,
    };
    return headers;
});
exports.createL2Headers = createL2Headers;
const injectBuilderHeaders = (l2Header, builderHeaders) => (Object.assign(Object.assign({}, l2Header), builderHeaders));
exports.injectBuilderHeaders = injectBuilderHeaders;
//# sourceMappingURL=index.js.map