"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderBuilder = void 0;
const tslib_1 = require("tslib");
const order_utils_1 = require("@polymarket/order-utils");
const helpers_1 = require("./helpers");
class OrderBuilder {
    constructor(signer, chainId, signatureType, funderAddress, getSigner) {
        this.signer = signer;
        this.chainId = chainId;
        this.signatureType = signatureType === undefined ? order_utils_1.SignatureType.EOA : signatureType;
        this.funderAddress = funderAddress;
        this.getSigner = getSigner;
    }
    /**
     * Generate and sign a order
     */
    buildOrder(userOrder, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const signer = yield this.resolveSigner();
            return (0, helpers_1.createOrder)(signer, this.chainId, this.signatureType, this.funderAddress, userOrder, options);
        });
    }
    /**
     * Generate and sign a market order
     */
    buildMarketOrder(userMarketOrder, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const signer = yield this.resolveSigner();
            return (0, helpers_1.createMarketOrder)(signer, this.chainId, this.signatureType, this.funderAddress, userMarketOrder, options);
        });
    }
    /** Unified getter: use fresh signer if available */
    resolveSigner() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.getSigner) {
                const s = yield this.getSigner();
                if (!s)
                    throw new Error("getSigner() function returned undefined or null");
                return s;
            }
            return this.signer;
        });
    }
}
exports.OrderBuilder = OrderBuilder;
//# sourceMappingURL=builder.js.map