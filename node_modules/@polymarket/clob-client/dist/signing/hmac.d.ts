/**
 * Builds the canonical Polymarket CLOB HMAC signature
 * @param signer
 * @param key
 * @param secret
 * @param passphrase
 * @returns string
 */
export declare const buildPolyHmacSignature: (secret: string, timestamp: number, method: string, requestPath: string, body?: string) => string;
