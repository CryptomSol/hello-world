"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_REWARDS_EARNINGS_PERCENTAGES = exports.GET_REWARDS_MARKETS = exports.GET_REWARDS_MARKETS_CURRENT = exports.GET_LIQUIDITY_REWARD_PERCENTAGES = exports.GET_TOTAL_EARNINGS_FOR_USER_FOR_DAY = exports.GET_EARNINGS_FOR_USER_FOR_DAY = exports.GET_MARKET_TRADES_EVENTS = exports.UPDATE_BALANCE_ALLOWANCE = exports.GET_BALANCE_ALLOWANCE = exports.DROP_NOTIFICATIONS = exports.GET_NOTIFICATIONS = exports.GET_PRICES_HISTORY = exports.ARE_ORDERS_SCORING = exports.IS_ORDER_SCORING = exports.GET_TRADES = exports.GET_OPEN_ORDERS = exports.CANCEL_MARKET_ORDERS = exports.CANCEL_ALL = exports.GET_ORDER = exports.CANCEL_ORDERS = exports.CANCEL_ORDER = exports.POST_ORDERS = exports.POST_ORDER = exports.GET_FEE_RATE = exports.GET_NEG_RISK = exports.GET_TICK_SIZE = exports.GET_LAST_TRADES_PRICES = exports.GET_LAST_TRADE_PRICE = exports.GET_SPREADS = exports.GET_SPREAD = exports.GET_PRICES = exports.GET_PRICE = exports.GET_MIDPOINTS = exports.GET_MIDPOINT = exports.GET_ORDER_BOOKS = exports.GET_ORDER_BOOK = exports.GET_MARKET = exports.GET_MARKETS = exports.GET_SIMPLIFIED_MARKETS = exports.GET_SAMPLING_MARKETS = exports.GET_SAMPLING_SIMPLIFIED_MARKETS = exports.REVOKE_BUILDER_API_KEY = exports.GET_BUILDER_API_KEYS = exports.CREATE_BUILDER_API_KEY = exports.CLOSED_ONLY = exports.DERIVE_API_KEY = exports.DELETE_API_KEY = exports.GET_API_KEYS = exports.CREATE_API_KEY = exports.TIME = void 0;
exports.GET_BUILDER_TRADES = void 0;
// Server Time
exports.TIME = "/time";
// API Key endpoints
exports.CREATE_API_KEY = "/auth/api-key";
exports.GET_API_KEYS = "/auth/api-keys";
exports.DELETE_API_KEY = "/auth/api-key";
exports.DERIVE_API_KEY = "/auth/derive-api-key";
exports.CLOSED_ONLY = "/auth/ban-status/closed-only";
// Builder API Key endpoints
exports.CREATE_BUILDER_API_KEY = "/auth/builder-api-key";
exports.GET_BUILDER_API_KEYS = "/auth/builder-api-key";
exports.REVOKE_BUILDER_API_KEY = "/auth/builder-api-key";
// Markets
exports.GET_SAMPLING_SIMPLIFIED_MARKETS = "/sampling-simplified-markets";
exports.GET_SAMPLING_MARKETS = "/sampling-markets";
exports.GET_SIMPLIFIED_MARKETS = "/simplified-markets";
exports.GET_MARKETS = "/markets";
exports.GET_MARKET = "/markets/";
exports.GET_ORDER_BOOK = "/book";
exports.GET_ORDER_BOOKS = "/books";
exports.GET_MIDPOINT = "/midpoint";
exports.GET_MIDPOINTS = "/midpoints";
exports.GET_PRICE = "/price";
exports.GET_PRICES = "/prices";
exports.GET_SPREAD = "/spread";
exports.GET_SPREADS = "/spreads";
exports.GET_LAST_TRADE_PRICE = "/last-trade-price";
exports.GET_LAST_TRADES_PRICES = "/last-trades-prices";
exports.GET_TICK_SIZE = "/tick-size";
exports.GET_NEG_RISK = "/neg-risk";
exports.GET_FEE_RATE = "/fee-rate";
// Order endpoints
exports.POST_ORDER = "/order";
exports.POST_ORDERS = "/orders";
exports.CANCEL_ORDER = "/order";
exports.CANCEL_ORDERS = "/orders";
exports.GET_ORDER = "/data/order/";
exports.CANCEL_ALL = "/cancel-all";
exports.CANCEL_MARKET_ORDERS = "/cancel-market-orders";
exports.GET_OPEN_ORDERS = "/data/orders";
exports.GET_TRADES = "/data/trades";
exports.IS_ORDER_SCORING = "/order-scoring";
exports.ARE_ORDERS_SCORING = "/orders-scoring";
// Price history
exports.GET_PRICES_HISTORY = "/prices-history";
// Notifications
exports.GET_NOTIFICATIONS = "/notifications";
exports.DROP_NOTIFICATIONS = "/notifications";
// Balance
exports.GET_BALANCE_ALLOWANCE = "/balance-allowance";
exports.UPDATE_BALANCE_ALLOWANCE = "/balance-allowance/update";
// Live activity
exports.GET_MARKET_TRADES_EVENTS = "/live-activity/events/";
// Rewards
exports.GET_EARNINGS_FOR_USER_FOR_DAY = "/rewards/user";
exports.GET_TOTAL_EARNINGS_FOR_USER_FOR_DAY = "/rewards/user/total";
exports.GET_LIQUIDITY_REWARD_PERCENTAGES = "/rewards/user/percentages";
exports.GET_REWARDS_MARKETS_CURRENT = "/rewards/markets/current";
exports.GET_REWARDS_MARKETS = "/rewards/markets/";
exports.GET_REWARDS_EARNINGS_PERCENTAGES = "/rewards/user/markets";
// Builder endpoints
exports.GET_BUILDER_TRADES = "/builder/trades";
//# sourceMappingURL=endpoints.js.map