/// <reference types="node" />
import BN from 'bn.js';
/**
 * Packs non-standard encoded values packed according to their respective type in types in a buffer.
 *
 * @param types - Array of types of each value to encode.
 * @param values - Array of values to encode.
 * @returns A buffer containing the packed values.
 */
export declare function solidityPack(types: string[], values: any[]): Buffer;
/**
 * Parse a number for determining a solidity hexvalue.
 *
 * @param arg - Number to parse.
 * @returns Parsed value.
 */
export declare function parseNumber(arg: string | number | BN): BN;
/**
 * @param types
 * @param values
 */
export declare function rawEncode(types: string[], values: (BN | Buffer | string | number | string[] | number[])[]): Buffer;
