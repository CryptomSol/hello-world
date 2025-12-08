export interface AbiItem {
    anonymous?: boolean;
    constant?: boolean;
    inputs?: AbiInput[];
    name?: string;
    outputs?: AbiOutput[];
    payable?: boolean;
    stateMutability?: string;
    type: string;
}
export interface AbiInput {
    name: string;
    type: string;
    indexed?: boolean;
    components?: AbiInput[];
}
export interface AbiOutput {
    name: string;
    type: string;
    components?: AbiOutput[];
}
