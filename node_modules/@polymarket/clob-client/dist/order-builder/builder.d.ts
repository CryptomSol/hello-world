import { Wallet } from "@ethersproject/wallet";
import { JsonRpcSigner } from "@ethersproject/providers";
import { SignedOrder, SignatureType } from "@polymarket/order-utils";
import { Chain, CreateOrderOptions, UserMarketOrder, UserOrder } from "../types";
export declare class OrderBuilder {
    readonly signer: Wallet | JsonRpcSigner;
    readonly chainId: Chain;
    readonly signatureType: SignatureType;
    readonly funderAddress?: string;
    /**
     * Optional function to dynamically resolve the signer.
     * If provided, this function will be called to obtain a fresh signer instance
     * (e.g., for smart contract wallets or when the signer may change).
     * Should return a Wallet or JsonRpcSigner, or a Promise resolving to one.
     * If not provided, the static `signer` property is used.
     */
    private getSigner?;
    constructor(signer: Wallet | JsonRpcSigner, chainId: Chain, signatureType?: SignatureType, funderAddress?: string, getSigner?: () => Promise<Wallet | JsonRpcSigner> | (Wallet | JsonRpcSigner));
    /**
     * Generate and sign a order
     */
    buildOrder(userOrder: UserOrder, options: CreateOrderOptions): Promise<SignedOrder>;
    /**
     * Generate and sign a market order
     */
    buildMarketOrder(userMarketOrder: UserMarketOrder, options: CreateOrderOptions): Promise<SignedOrder>;
    /** Unified getter: use fresh signer if available */
    private resolveSigner;
}
