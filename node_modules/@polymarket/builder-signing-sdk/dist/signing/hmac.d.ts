/**
 * Builds an hmac signature
 * @param signer
 * @param key
 * @param secret
 * @param passphrase
 * @returns string
 */
export declare const buildHmacSignature: (secret: string, timestamp: number, method: string, requestPath: string, body?: string) => string;
