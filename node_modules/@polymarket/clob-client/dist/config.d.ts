type ContractConfig = {
    exchange: string;
    negRiskAdapter: string;
    negRiskExchange: string;
    collateral: string;
    conditionalTokens: string;
};
declare const COLLATERAL_TOKEN_DECIMALS = 6;
declare const CONDITIONAL_TOKEN_DECIMALS = 6;
declare const getContractConfig: (chainID: number) => ContractConfig;
export type { ContractConfig };
export { getContractConfig, COLLATERAL_TOKEN_DECIMALS, CONDITIONAL_TOKEN_DECIMALS };
