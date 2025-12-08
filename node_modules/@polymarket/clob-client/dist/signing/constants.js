"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOB_TYPES = exports.CLOB_DOMAIN = exports.MSG_TO_SIGN = exports.CLOB_VERSION = exports.CLOB_DOMAIN_NAME = void 0;
exports.CLOB_DOMAIN_NAME = "ClobAuthDomain";
exports.CLOB_VERSION = "1";
exports.MSG_TO_SIGN = "This message attests that I control the given wallet";
exports.CLOB_DOMAIN = {
    name: exports.CLOB_DOMAIN_NAME,
    version: exports.CLOB_VERSION,
    chainId: 1,
};
exports.CLOB_TYPES = {
    ClobAuth: [
        { name: "address", type: "address" },
        { name: "timestamp", type: "string" },
        { name: "message", type: "string" },
    ],
};
//# sourceMappingURL=constants.js.map