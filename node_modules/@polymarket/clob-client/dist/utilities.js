"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceValid = exports.isTickSizeSmaller = exports.generateOrderBookSummaryHash = exports.decimalPlaces = exports.roundUp = exports.roundDown = exports.roundNormal = exports.orderToJson = void 0;
const order_utils_1 = require("@polymarket/order-utils");
const crypto_1 = require("crypto");
const types_1 = require("./types");
function orderToJson(order, owner, orderType, deferExec = false) {
    let side = types_1.Side.BUY;
    if (order.side == order_utils_1.Side.BUY) {
        side = types_1.Side.BUY;
    }
    else {
        side = types_1.Side.SELL;
    }
    return {
        deferExec,
        order: {
            salt: parseInt(order.salt, 10),
            maker: order.maker,
            signer: order.signer,
            taker: order.taker,
            tokenId: order.tokenId,
            makerAmount: order.makerAmount,
            takerAmount: order.takerAmount,
            side,
            expiration: order.expiration,
            nonce: order.nonce,
            feeRateBps: order.feeRateBps,
            signatureType: order.signatureType,
            signature: order.signature,
        },
        owner,
        orderType,
    };
}
exports.orderToJson = orderToJson;
const roundNormal = (num, decimals) => {
    if ((0, exports.decimalPlaces)(num) <= decimals) {
        return num;
    }
    return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
exports.roundNormal = roundNormal;
const roundDown = (num, decimals) => {
    if ((0, exports.decimalPlaces)(num) <= decimals) {
        return num;
    }
    return Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
exports.roundDown = roundDown;
const roundUp = (num, decimals) => {
    if ((0, exports.decimalPlaces)(num) <= decimals) {
        return num;
    }
    return Math.ceil(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
exports.roundUp = roundUp;
const decimalPlaces = (num) => {
    if (Number.isInteger(num)) {
        return 0;
    }
    const arr = num.toString().split(".");
    if (arr.length <= 1) {
        return 0;
    }
    return arr[1].length;
};
exports.decimalPlaces = decimalPlaces;
/**
 * Calculates the hash for the given orderbook
 * @param orderbook
 * @returns
 */
const generateOrderBookSummaryHash = (orderbook) => {
    orderbook.hash = "";
    const hash = (0, crypto_1.createHash)("sha1").update(JSON.stringify(orderbook)).digest("hex");
    orderbook.hash = hash;
    return hash;
};
exports.generateOrderBookSummaryHash = generateOrderBookSummaryHash;
const isTickSizeSmaller = (a, b) => {
    return parseFloat(a) < parseFloat(b);
};
exports.isTickSizeSmaller = isTickSizeSmaller;
const priceValid = (price, tickSize) => {
    return price >= parseFloat(tickSize) && price <= 1 - parseFloat(tickSize);
};
exports.priceValid = priceValid;
//# sourceMappingURL=utilities.js.map