"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncryptionPublicKey = exports.decryptSafely = exports.decrypt = exports.encryptSafely = exports.encrypt = void 0;
const nacl = __importStar(require("tweetnacl"));
const naclUtil = __importStar(require("tweetnacl-util"));
const utils_1 = require("./utils");
/**
 * Encrypt a message.
 *
 * @param options - The encryption options.
 * @param options.publicKey - The public key of the message recipient.
 * @param options.data - The message data.
 * @param options.version - The type of encryption to use.
 * @returns The encrypted data.
 */
function encrypt({ publicKey, data, version, }) {
    if ((0, utils_1.isNullish)(publicKey)) {
        throw new Error('Missing publicKey parameter');
    }
    else if ((0, utils_1.isNullish)(data)) {
        throw new Error('Missing data parameter');
    }
    else if ((0, utils_1.isNullish)(version)) {
        throw new Error('Missing version parameter');
    }
    switch (version) {
        case 'x25519-xsalsa20-poly1305': {
            if (typeof data !== 'string') {
                throw new Error('Message data must be given as a string');
            }
            // generate ephemeral keypair
            const ephemeralKeyPair = nacl.box.keyPair();
            // assemble encryption parameters - from string to UInt8
            let pubKeyUInt8Array;
            try {
                pubKeyUInt8Array = naclUtil.decodeBase64(publicKey);
            }
            catch (err) {
                throw new Error('Bad public key');
            }
            const msgParamsUInt8Array = naclUtil.decodeUTF8(data);
            const nonce = nacl.randomBytes(nacl.box.nonceLength);
            // encrypt
            const encryptedMessage = nacl.box(msgParamsUInt8Array, nonce, pubKeyUInt8Array, ephemeralKeyPair.secretKey);
            // handle encrypted data
            const output = {
                version: 'x25519-xsalsa20-poly1305',
                nonce: naclUtil.encodeBase64(nonce),
                ephemPublicKey: naclUtil.encodeBase64(ephemeralKeyPair.publicKey),
                ciphertext: naclUtil.encodeBase64(encryptedMessage),
            };
            // return encrypted msg data
            return output;
        }
        default:
            throw new Error('Encryption type/version not supported');
    }
}
exports.encrypt = encrypt;
/**
 * Encrypt a message in a way that obscures the message length.
 *
 * The message is padded to a multiple of 2048 before being encrypted so that the length of the
 * resulting encrypted message can't be used to guess the exact length of the original message.
 *
 * @param options - The encryption options.
 * @param options.publicKey - The public key of the message recipient.
 * @param options.data - The message data.
 * @param options.version - The type of encryption to use.
 * @returns The encrypted data.
 */
function encryptSafely({ publicKey, data, version, }) {
    if ((0, utils_1.isNullish)(publicKey)) {
        throw new Error('Missing publicKey parameter');
    }
    else if ((0, utils_1.isNullish)(data)) {
        throw new Error('Missing data parameter');
    }
    else if ((0, utils_1.isNullish)(version)) {
        throw new Error('Missing version parameter');
    }
    const DEFAULT_PADDING_LENGTH = 2 ** 11;
    const NACL_EXTRA_BYTES = 16;
    if (typeof data === 'object' && data && 'toJSON' in data) {
        // remove toJSON attack vector
        // TODO, check all possible children
        throw new Error('Cannot encrypt with toJSON property.  Please remove toJSON property');
    }
    // add padding
    const dataWithPadding = {
        data,
        padding: '',
    };
    // calculate padding
    const dataLength = Buffer.byteLength(JSON.stringify(dataWithPadding), 'utf-8');
    const modVal = dataLength % DEFAULT_PADDING_LENGTH;
    let padLength = 0;
    // Only pad if necessary
    if (modVal > 0) {
        padLength = DEFAULT_PADDING_LENGTH - modVal - NACL_EXTRA_BYTES; // nacl extra bytes
    }
    dataWithPadding.padding = '0'.repeat(padLength);
    const paddedMessage = JSON.stringify(dataWithPadding);
    return encrypt({ publicKey, data: paddedMessage, version });
}
exports.encryptSafely = encryptSafely;
/**
 * Decrypt a message.
 *
 * @param options - The decryption options.
 * @param options.encryptedData - The encrypted data.
 * @param options.privateKey - The private key to decrypt with.
 * @returns The decrypted message.
 */
function decrypt({ encryptedData, privateKey, }) {
    if ((0, utils_1.isNullish)(encryptedData)) {
        throw new Error('Missing encryptedData parameter');
    }
    else if ((0, utils_1.isNullish)(privateKey)) {
        throw new Error('Missing privateKey parameter');
    }
    switch (encryptedData.version) {
        case 'x25519-xsalsa20-poly1305': {
            // string to buffer to UInt8Array
            const receiverPrivateKeyUint8Array = naclDecodeHex(privateKey);
            const receiverEncryptionPrivateKey = nacl.box.keyPair.fromSecretKey(receiverPrivateKeyUint8Array).secretKey;
            // assemble decryption parameters
            const nonce = naclUtil.decodeBase64(encryptedData.nonce);
            const ciphertext = naclUtil.decodeBase64(encryptedData.ciphertext);
            const ephemPublicKey = naclUtil.decodeBase64(encryptedData.ephemPublicKey);
            // decrypt
            const decryptedMessage = nacl.box.open(ciphertext, nonce, ephemPublicKey, receiverEncryptionPrivateKey);
            // return decrypted msg data
            try {
                if (!decryptedMessage) {
                    throw new Error();
                }
                const output = naclUtil.encodeUTF8(decryptedMessage);
                // TODO: This is probably extraneous but was kept to minimize changes during refactor
                if (!output) {
                    throw new Error();
                }
                return output;
            }
            catch (err) {
                if (err && typeof err.message === 'string' && err.message.length) {
                    throw new Error(`Decryption failed: ${err.message}`);
                }
                throw new Error(`Decryption failed.`);
            }
        }
        default:
            throw new Error('Encryption type/version not supported.');
    }
}
exports.decrypt = decrypt;
/**
 * Decrypt a message that has been encrypted using `encryptSafely`.
 *
 * @param options - The decryption options.
 * @param options.encryptedData - The encrypted data.
 * @param options.privateKey - The private key to decrypt with.
 * @returns The decrypted message.
 */
function decryptSafely({ encryptedData, privateKey, }) {
    if ((0, utils_1.isNullish)(encryptedData)) {
        throw new Error('Missing encryptedData parameter');
    }
    else if ((0, utils_1.isNullish)(privateKey)) {
        throw new Error('Missing privateKey parameter');
    }
    const dataWithPadding = JSON.parse(decrypt({ encryptedData, privateKey }));
    return dataWithPadding.data;
}
exports.decryptSafely = decryptSafely;
/**
 * Get the encryption public key for the given key.
 *
 * @param privateKey - The private key to generate the encryption public key with.
 * @returns The encryption public key.
 */
function getEncryptionPublicKey(privateKey) {
    const privateKeyUint8Array = naclDecodeHex(privateKey);
    const encryptionPublicKey = nacl.box.keyPair.fromSecretKey(privateKeyUint8Array).publicKey;
    return naclUtil.encodeBase64(encryptionPublicKey);
}
exports.getEncryptionPublicKey = getEncryptionPublicKey;
/**
 * Convert a hex string to the UInt8Array format used by nacl.
 *
 * @param msgHex - The string to convert.
 * @returns The converted string.
 */
function naclDecodeHex(msgHex) {
    const msgBase64 = Buffer.from(msgHex, 'hex').toString('base64');
    return naclUtil.decodeBase64(msgBase64);
}
//# sourceMappingURL=encryption.js.map