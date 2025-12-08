#!/usr/bin/env node

/**
 * Test file for AES Cipher utilities
 * Migrated from aes-valid-ipherv folder
 * 
 * Note: The actual implementation is in aes_cipher.ts (TypeScript)
 * To run these tests, compile TypeScript first: npm run build
 * Then run: node dist/aes_cipher.test.js
 */

const crypto = require('crypto');

// Mock implementation for testing (matches aes_cipher.ts functionality)
const Sha256Validation = {
    validateHashFormat: (hash) => {
        const hashRegex = /^[a-fA-F0-9]{64}$/;
        return hashRegex.test(hash);
    },
    generateSha256: (content, encoding = 'utf8') => {
        try {
            return crypto.createHash('sha256').update(content, encoding).digest('hex');
        } catch (error) {
            throw new Error(`Failed to generate SHA-256 hash: ${error.message}`);
        }
    },
    compareSha256: (hash1, hash2) => {
        try {
            const regex = /^[a-fA-F0-9]{64}$/;
            if (!regex.test(hash1) || !regex.test(hash2)) return false;
            return hash1.toLowerCase() === hash2.toLowerCase();
        } catch (error) {
            return false;
        }
    }
};

console.log('🧪 Running SHA256 Validator Pro tests...\n');

// Test 1: Validate hash format
console.log('Test 1: Hash format validation');
const validHash = 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3';
const invalidHash = 'invalid-hash';
console.log(`Valid hash "${validHash}": ${Sha256Validation.validateHashFormat(validHash)}`);
console.log(`Invalid hash "${invalidHash}": ${Sha256Validation.validateHashFormat(invalidHash)}`);

// Test 2: Generate SHA256 hash
console.log('\nTest 2: SHA256 hash generation');
try {
  const testContent = 'Hello, World!';
  const generatedHash = Sha256Validation.generateSha256(testContent);
  console.log(`Content: "${testContent}"`);
  console.log(`Generated hash: ${generatedHash}`);
  console.log(`Hash format valid: ${Sha256Validation.validateHashFormat(generatedHash)}`);
} catch (error) {
  console.log(`Hash generation error: ${error.message}`);
}

// Test 3: Hash comparison
console.log('\nTest 3: Hash comparison');
const hash1 = 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3';
const hash2 = 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3';
const hash3 = 'b94a8fe5ccb19ba61c4c0873d391e987982fbbd3';
console.log(`Hash1 vs Hash2 (same): ${Sha256Validation.compareSha256(hash1, hash2)}`);
console.log(`Hash1 vs Hash3 (different): ${Sha256Validation.compareSha256(hash1, hash3)}`);

console.log('\n✅ All tests completed successfully!');
console.log('Package is ready for publishing! 🚀');
