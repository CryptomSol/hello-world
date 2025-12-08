"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildClobEip712Signature = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("./constants");
/**
 * Builds the canonical Polymarket CLOB EIP712 signature
 * @param signer
 * @param ts
 * @returns string
 */
const buildClobEip712Signature = (signer, chainId, timestamp, nonce) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const address = yield signer.getAddress();
    const ts = `${timestamp}`;
    const domain = {
        name: "ClobAuthDomain",
        version: "1",
        chainId: chainId,
    };
    const types = {
        ClobAuth: [
            { name: "address", type: "address" },
            { name: "timestamp", type: "string" },
            { name: "nonce", type: "uint256" },
            { name: "message", type: "string" },
        ],
    };
    const value = {
        address,
        timestamp: ts,
        nonce,
        message: constants_1.MSG_TO_SIGN,
    };
    // eslint-disable-next-line no-underscore-dangle
    const sig = yield signer._signTypedData(domain, types, value);
    return sig;
});
exports.buildClobEip712Signature = buildClobEip712Signature;
//# sourceMappingURL=eip712.js.map