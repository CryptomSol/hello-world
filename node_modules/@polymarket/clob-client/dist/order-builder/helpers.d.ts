import { JsonRpcSigner } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { OrderData, SignatureType, SignedOrder, Side as UtilsSide } from "@polymarket/order-utils";
import { UserOrder, Side, Chain, UserMarketOrder, TickSize, RoundConfig, CreateOrderOptions, OrderSummary, OrderType } from "../types";
export declare const ROUNDING_CONFIG: Record<TickSize, RoundConfig>;
/**
 * Generate and sign a order
 *
 * @param signer
 * @param exchangeAddress ctf exchange contract address
 * @param chainId
 * @param OrderData
 * @returns SignedOrder
 */
export declare const buildOrder: (signer: Wallet | JsonRpcSigner, exchangeAddress: string, chainId: number, orderData: OrderData) => Promise<SignedOrder>;
export declare const getOrderRawAmounts: (side: Side, size: number, price: number, roundConfig: RoundConfig) => {
    side: UtilsSide;
    rawMakerAmt: number;
    rawTakerAmt: number;
};
/**
 * Translate simple user order to args used to generate Orders
 */
export declare const buildOrderCreationArgs: (signer: string, maker: string, signatureType: SignatureType, userOrder: UserOrder, roundConfig: RoundConfig) => Promise<OrderData>;
export declare const createOrder: (eoaSigner: Wallet | JsonRpcSigner, chainId: Chain, signatureType: SignatureType, funderAddress: string | undefined, userOrder: UserOrder, options: CreateOrderOptions) => Promise<SignedOrder>;
export declare const getMarketOrderRawAmounts: (side: Side, amount: number, price: number, roundConfig: RoundConfig) => {
    side: UtilsSide;
    rawMakerAmt: number;
    rawTakerAmt: number;
};
/**
 * Translate simple user market order to args used to generate Orders
 */
export declare const buildMarketOrderCreationArgs: (signer: string, maker: string, signatureType: SignatureType, userMarketOrder: UserMarketOrder, roundConfig: RoundConfig) => Promise<OrderData>;
export declare const createMarketOrder: (eoaSigner: Wallet | JsonRpcSigner, chainId: Chain, signatureType: SignatureType, funderAddress: string | undefined, userMarketOrder: UserMarketOrder, options: CreateOrderOptions) => Promise<SignedOrder>;
/**
 * calculateBuyMarketPrice calculates the market price to buy a $$ amount
 * @param positions
 * @param amountToMatch worth to buy
 * @returns
 */
export declare const calculateBuyMarketPrice: (positions: OrderSummary[], amountToMatch: number, orderType: OrderType) => number;
/**
 * calculateSellMarketPrice calculates the market price to sell a shares
 * @param positions
 * @param amountToMatch sells to share
 * @returns
 */
export declare const calculateSellMarketPrice: (positions: OrderSummary[], amountToMatch: number, orderType: OrderType) => number;
