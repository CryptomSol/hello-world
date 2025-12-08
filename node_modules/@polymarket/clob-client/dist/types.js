"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetType = exports.PriceHistoryInterval = exports.Chain = exports.OrderType = exports.Side = void 0;
var Side;
(function (Side) {
    Side["BUY"] = "BUY";
    Side["SELL"] = "SELL";
})(Side = exports.Side || (exports.Side = {}));
var OrderType;
(function (OrderType) {
    OrderType["GTC"] = "GTC";
    OrderType["FOK"] = "FOK";
    OrderType["GTD"] = "GTD";
    OrderType["FAK"] = "FAK";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var Chain;
(function (Chain) {
    Chain[Chain["POLYGON"] = 137] = "POLYGON";
    Chain[Chain["AMOY"] = 80002] = "AMOY";
})(Chain = exports.Chain || (exports.Chain = {}));
var PriceHistoryInterval;
(function (PriceHistoryInterval) {
    PriceHistoryInterval["MAX"] = "max";
    PriceHistoryInterval["ONE_WEEK"] = "1w";
    PriceHistoryInterval["ONE_DAY"] = "1d";
    PriceHistoryInterval["SIX_HOURS"] = "6h";
    PriceHistoryInterval["ONE_HOUR"] = "1h";
})(PriceHistoryInterval = exports.PriceHistoryInterval || (exports.PriceHistoryInterval = {}));
var AssetType;
(function (AssetType) {
    AssetType["COLLATERAL"] = "COLLATERAL";
    AssetType["CONDITIONAL"] = "CONDITIONAL";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
//# sourceMappingURL=types.js.map