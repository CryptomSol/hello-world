"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const request = async (endpoint, method, headers, data, params) => {
    return await (0, axios_1.default)({ method, url: endpoint, headers, data, params });
};
const post = async (endpoint, options) => {
    const resp = await request(endpoint, "POST", options?.headers, options?.data, options?.params);
    return resp.data;
};
exports.post = post;
//# sourceMappingURL=index.js.map