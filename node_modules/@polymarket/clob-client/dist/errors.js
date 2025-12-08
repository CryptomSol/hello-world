"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUILDER_AUTH_FAILED = exports.BUILDER_AUTH_NOT_AVAILABLE = exports.L2_AUTH_NOT_AVAILABLE = exports.L1_AUTH_UNAVAILABLE_ERROR = void 0;
exports.L1_AUTH_UNAVAILABLE_ERROR = new Error("Signer is needed to interact with this endpoint!");
exports.L2_AUTH_NOT_AVAILABLE = new Error("API Credentials are needed to interact with this endpoint!");
exports.BUILDER_AUTH_NOT_AVAILABLE = new Error("Builder API Credentials needed to interact with this endpoint!");
exports.BUILDER_AUTH_FAILED = new Error("Builder key auth failed!");
//# sourceMappingURL=errors.js.map