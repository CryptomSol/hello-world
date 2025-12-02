# Balance Checking Feature

## What It Does

The bot now automatically checks your wallet balances before starting:
- **USDC Balance**: How much trading capital you have
- **MATIC Balance**: How much gas you have for transactions

## When It Checks

1. **At Startup**: Before the bot starts trading
2. **Every Minute**: While the bot is running (periodic check)
3. **On Demand**: Run `npm run check-balance` anytime

## What It Shows

```
===========================================================
💰 WALLET BALANCES
===========================================================
Address: 0xYourAddress...
USDC: $100.50
MATIC: 0.5432 ($0.27 @ $0.50)
===========================================================

📊 Balance Check:
  ✅ USDC: $100.50
  ✅ MATIC: 0.5432
```

## If You Don't Have Enough

The bot will **NOT** let you start trading and shows exactly what you need:

```
❌ Insufficient USDC: $2.35 (need at least $5.00)
❌ Insufficient MATIC: 0.0123 (need at least 0.05 for gas)

❌ Insufficient funds to start trading!
Please fund your wallet:
  - USDC: At least $5.00
  - MATIC: At least 0.05 for gas fees
```

## Check Balance Manually

```bash
npm run check-balance
```

This shows your current balances without starting the bot.

## Technical Details

- **USDC Contract**: `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` (Polygon)
- **Network**: Polygon (Chain ID: 137)
- **RPC**: `https://polygon-rpc.com`
- **Minimum USDC**: Configurable (default: $5.00)
- **Minimum MATIC**: 0.05 for gas (recommended: 0.5+)

## Files Changed

- `src/balance_checker.ts` - New balance checking module
- `src/auto_trading_bot.ts` - Integrated balance checks
- `src/main.ts` - Added balance check to menu (option 2)
- `src/check_balance.ts` - Standalone balance checker script
- `README_REAL.md` - Added USDC/MATIC setup instructions

