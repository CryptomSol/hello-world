# Polymarket CLOB Credentials Guide

## What are CLOB Credentials?

CLOB (Central Limit Order Book) credentials are API keys that allow you to:
- Place orders on Polymarket
- Cancel orders
- View your open orders
- Access authenticated endpoints

## How to Generate Credentials

### Method 1: Using the Automated Script (Recommended)

1. **Add your private key to `.env`**:
   ```bash
   PRIVATE_KEY=0xYourPrivateKeyHere
   ```

2. **Run the credential generator**:
   ```bash
   npm run gen-creds
   ```

3. **Your credentials will be displayed and saved to `.credentials.json`**

### Method 2: Manual Generation

If you prefer to generate credentials manually:

```typescript
import { ClobClient } from '@polymarket/clob-client';
import { Wallet } from '@ethersproject/wallet';

const wallet = new Wallet('0xYourPrivateKey');
const client = new ClobClient('https://clob.polymarket.com', 137, wallet);

// Generate credentials (signs a message with your wallet)
const creds = await client.createOrDeriveApiKey();

console.log('API Key:', creds.apiKey);
console.log('Secret:', creds.secret);
console.log('Passphrase:', creds.passphrase);

// Use credentials for authenticated requests
client.setApiCreds(creds);
```

## Where to Get Your Private Key

### MetaMask
1. Click on your account
2. Select "Account Details"
3. Click "Export Private Key"
4. Enter your password
5. Copy the private key (starts with `0x`)

### Magic/Email Wallet (Polymarket)
1. Go to https://reveal.magic.link/polymarket
2. Enter your email
3. Follow the authentication steps
4. Copy the revealed private key

### Hardware Wallet
- Hardware wallets (Ledger, Trezor) cannot export private keys
- Use browser wallet connection instead of this bot

## Understanding the Credentials

### API Key
- Public identifier for your API access
- Safe to share with Polymarket API
- Example: `7c8f3e2a-1b4d-4e9f-a3c2-9d7e6f5a4b3c`

### Secret
- Used to sign API requests
- **NEVER share this**
- Used with API Key to authenticate

### Passphrase
- Additional security layer
- **NEVER share this**
- Required for all authenticated requests

## Important Security Notes

⚠️ **CRITICAL SECURITY WARNINGS:**

1. **Never commit credentials to Git**
   - The `.env` and `.credentials.json` files are in `.gitignore`
   - Never share these files publicly

2. **Keep your private key secret**
   - Anyone with your private key can control your wallet
   - Never paste it in public channels or unsecured apps

3. **Credentials are deterministic**
   - The same private key always generates the same credentials
   - You can safely regenerate them anytime

4. **Test with small amounts first**
   - Before trading large amounts, test with small trades
   - Verify everything works as expected

## Using Credentials in Your Code

### Option 1: Automatic Credential Generation (Used by this bot)

```typescript
const client = new ClobClient(host, chainId, wallet);
const creds = await client.createOrDeriveApiKey();
client.setApiCreds(creds);

// Now you can make authenticated requests
await client.getOpenOrders();
```

### Option 2: Using Saved Credentials

```typescript
import { ApiKeyCreds } from '@polymarket/clob-client';

const creds: ApiKeyCreds = {
    apiKey: process.env.CLOB_API_KEY!,
    secret: process.env.CLOB_SECRET!,
    passphrase: process.env.CLOB_PASS_PHRASE!
};

const client = new ClobClient(host, chainId, wallet, creds);

// Client is now authenticated
```

## Credential Lifecycle

### Creating New Credentials
```typescript
const creds = await client.createApiKey();
```

### Deriving Existing Credentials
```typescript
const creds = await client.deriveApiKey();
```

### Create or Derive (Recommended)
```typescript
// Will derive if exists, create if new
const creds = await client.createOrDeriveApiKey();
```

### Viewing Your API Keys
```typescript
const apiKeys = await client.getApiKeys();
console.log(apiKeys);
```

### Deleting API Keys
```typescript
await client.deleteApiKey();
```

## Troubleshooting

### "Private key not provided"
- Make sure your `.env` file has `PRIVATE_KEY=0x...`
- Ensure the private key starts with `0x`
- Check that the `.env` file is in the project root

### "Failed to generate credentials"
- Check your internet connection
- Verify the private key is correct (64 hex characters after `0x`)
- Ensure you're on Polygon mainnet (chainId: 137)

### "Authentication failed"
- Regenerate credentials with `npm run gen-creds`
- Make sure you're using the correct credentials for the wallet
- Check that credentials haven't been deleted on the server

## Testing Your Credentials

After generating credentials, you can test them:

```bash
# Run the main bot (will use credentials automatically)
npm run dev

# Check specific functionality
npm run allowance  # Check USDC allowance
npm run market     # Find current markets
```

## Advanced: Signature Types

When creating the CLOB client, you can specify signature types:

```typescript
const signatureType = 0; // 0: EOA (MetaMask, Hardware), 1: Magic/Email, 2: Proxy

const client = new ClobClient(
    host,
    chainId,
    wallet,
    creds,
    signatureType,
    funderAddress  // Optional: for proxy wallets
);
```

- **Type 0**: Standard wallets (MetaMask, private key, hardware)
- **Type 1**: Email/Magic wallets
- **Type 2**: Proxy/smart contract wallets

## Related Files

- `src/generate_credentials.ts` - Credential generation script
- `src/_gen_credential.ts` - Credential manager class
- `.env.example` - Example environment variables
- `.credentials.json` - Generated credentials (auto-created, git-ignored)

## Questions?

- [Polymarket Documentation](https://docs.polymarket.com)
- [CLOB API Docs](https://docs.polymarket.com/#clob-api)
- [GitHub Issues](https://github.com/Polymarket/clob-client)

