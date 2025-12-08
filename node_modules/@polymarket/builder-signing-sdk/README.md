# builder-signing-sdk

A TypeScript SDK for creating authenticated builder headers


## Installation

```bash
pnpm install @polymarket/builder-signing-sdk
```

## Quick Start

```typescript
import { BuilderSigner } from '@polymarket/builder-signing-sdk';

// Initialize with builder API creds
const builderSigner = new BuilderSigner({
  key: 'your-builder-api-key',
  secret: 'your-base64-secret',
  passphrase: 'your-passphrase'
});

// Create builder payload
const headers = builderSigner.createBuilderHeaderPayload(
  'POST'                   // HTTP method
  '/order',               // API endpoint path
  '{"marketId": "0x123"}' // Request body
);
```