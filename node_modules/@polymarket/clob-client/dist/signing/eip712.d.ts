import { Wallet } from "@ethersproject/wallet";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Chain } from "src/types";
/**
 * Builds the canonical Polymarket CLOB EIP712 signature
 * @param signer
 * @param ts
 * @returns string
 */
export declare const buildClobEip712Signature: (signer: Wallet | JsonRpcSigner, chainId: Chain, timestamp: number, nonce: number) => Promise<string>;
