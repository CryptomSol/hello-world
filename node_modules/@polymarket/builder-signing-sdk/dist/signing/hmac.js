"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHmacSignature = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
function replaceAll(s, search, replace) {
    return s.split(search).join(replace);
}
/**
 * Builds an hmac signature
 * @param signer
 * @param key
 * @param secret
 * @param passphrase
 * @returns string
 */
const buildHmacSignature = (secret, timestamp, method, requestPath, body) => {
    let message = timestamp + method + requestPath;
    if (body !== undefined) {
        message += body;
    }
    const base64Secret = Buffer.from(secret, "base64");
    const hmac = crypto_1.default.createHmac("sha256", base64Secret);
    const sig = hmac.update(message).digest("base64");
    // NOTE: Must be url safe base64 encoding, but keep base64 "=" suffix
    // Convert '+' to '-'
    // Convert '/' to '_'
    const sigUrlSafe = replaceAll(replaceAll(sig, "+", "-"), "/", "_");
    return sigUrlSafe;
};
exports.buildHmacSignature = buildHmacSignature;
//# sourceMappingURL=hmac.js.map