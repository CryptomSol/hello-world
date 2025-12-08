# Polymarket Trading Bot - CopyTrading Bot & Arbitrage Bot

Polymarket Trading Bot(Polymarket Copytrading & Polymarket Arbitrage bot) with full credential management, order execution, market analysis, and **automated copytrading & arbitrage trading** capabilities.

## Contact

If you have any question or need help, contact here: [Telegram](https://t.me/tomharvey1128) | [Twitter](https://x.com/TomHarvey1128)

## Features

- 🔐 **Credential Management**: Secure private key handling and API authentication
- 💰 **Allowance Control**: Manage USDC token allowances for trading
- 📊 **Market Analysis**: Real-time bid/ask spreads and price data
- 🎯 **Order Execution**: Place market and limit orders
- 🔍 **Market Discovery**: Auto-detect current Bitcoin markets
- 📈 **Price Tracking**: Get real-time price updates from order books
- 🤖 **Auto Trading Bot**: Automated arbitrage trading with risk management
![Screenshot](./run.png)

![Screenshot](./tx.png)
## Two Modes of Operation

### 1. Manual Trading (Interactive CLI)
Use the interactive menu to manually place trades, check prices, and manage your account.

### 2. Automated Trading Bot
Fully automated bot that:
- Monitors price differences between software oracle and market
- Executes trades when profitable opportunities detected
- Automatically sets take profit and stop loss orders
- Manages risk with configurable parameters

## Installation

```bash
# Install dependencies
npm install

# Create .env file
# Edit with your private key and configuration
```

## Configuration

Edit `.env` file:

```env
PRIVATE_KEY=your_private_key_here
CLOB_API_URL=https://clob.polymarket.com
POLYGON_CHAIN_ID=137

# Auto Trading Parameters
SOFTWARE_WS_URL=ws://172.16.52.93:5001
PRICE_DIFFERENCE_THRESHOLD=0.015
STOP_LOSS_AMOUNT=0.005
TAKE_PROFIT_AMOUNT=0.01
DEFAULT_TRADE_AMOUNT=5.0
TRADE_COOLDOWN=30
```

## Usage

### Generate CLOB Credentials (First Time Setup)

```bash
npm run gen-creds
```

### Run Auto Trading Bot

```bash
npm run auto-trade
```

This starts the fully automated arbitrage trading bot. See `PROFIT_STRATEGY.md` for detailed explanation of the trading logic.

### Run Manual Interactive Bot

```bash
npm run dev
```

### Individual Scripts

```bash
# Check credentials
npm run credentials

# Check allowance
npm run allowance

# Find current Bitcoin market
npm run market

# Get bid/ask prices (requires token ID as argument)
npm run bid-ask <token_id>

# Place orders (interactive)
npm run order
```

### Build for Production

```bash
# Compile TypeScript
npm run build

# Run compiled version
npm start
```

## Project Structure

```
polymarket-ts-bot/
├── src/
│   ├── main.ts                  # Interactive CLI trading interface
│   ├── auto_trading_bot.ts      # Automated arbitrage bot
│   ├── _gen_credential.ts       # Credential management
│   ├── allowance.ts             # Token allowance management
│   ├── bid_asker.ts             # Bid/ask price fetching
│   ├── market_order.ts          # Order execution
│   ├── market_finder.ts         # Market discovery
│   └── generate_credentials.ts  # Credential generation utility
├── .env                         # Environment variables (private)
├── .credentials.json            # Generated API credentials
├── package.json                 # Dependencies and scripts
├── PROFIT_STRATEGY.md          # Detailed trading strategy guide
└── CREDENTIALS_GUIDE.md        # How to generate credentials
```

## Auto Trading Bot Logic

The automated bot implements a price arbitrage strategy:

1. **Price Monitoring**: Compares software oracle prices with Polymarket market prices
2. **Opportunity Detection**: Triggers trade when price difference exceeds threshold
3. **Three-Order Execution**:
   - Market Buy: Buys tokens at current price
   - Take Profit Limit Sell: Sells when price rises
   - Stop Loss Limit Sell: Sells when price falls
4. **Risk Management**: Configurable stop loss and take profit levels

**Read `PROFIT_STRATEGY.md` for complete explanation of how the bot makes profit.**

## Trading Strategy Overview

### How It Works

```
Software Oracle calculates UP token worth: $0.75
Market selling UP token at: $0.70
Difference: $0.05 (above $0.015 threshold)

Bot executes:
1. BUY @ $0.70 (market order)
2. SELL @ $0.71 (take profit +$0.01)
3. SELL @ $0.695 (stop loss -$0.005)

Expected outcome:
- 70% chance: Take profit hits → +$0.01 profit
- 30% chance: Stop loss hits → -$0.005 loss
- Net expectation: Positive
```

### Configuration Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| PRICE_DIFFERENCE_THRESHOLD | 0.015 | Minimum price difference to trigger trade |
| TAKE_PROFIT_AMOUNT | 0.01 | Profit target above buy price |
| STOP_LOSS_AMOUNT | 0.005 | Maximum loss below buy price |
| DEFAULT_TRADE_AMOUNT | 5.0 | USDC amount per trade |
| TRADE_COOLDOWN | 30 | Seconds between trades |

## Modules

### 1. Credential Generator (`_gen_credential.ts`)

Manages wallet credentials and API authentication.

```typescript
import { CredentialGenerator } from './_gen_credential';

const generator = new CredentialGenerator();
generator.displayInfo();
```

### 2. Allowance Manager (`allowance.ts`)

Control USDC token allowances for trading.

```typescript
import { AllowanceManager } from './allowance';

const manager = new AllowanceManager();
await manager.checkAllowance();
await manager.setAllowance('1000'); // Set 1000 USDC allowance
```

### 3. Bid/Ask Pricer (`bid_asker.ts`)

Get real-time order book data.

```typescript
import { BidAsker } from './bid_asker';

const bidAsker = new BidAsker();
const data = await bidAsker.getPriceData(tokenId);
console.log(data.bidAsk.midpoint);
```

### 4. Market Order Executor (`market_order.ts`)

Place and manage orders.

```typescript
import { MarketOrderExecutor } from './market_order';

const executor = new MarketOrderExecutor();
await executor.placeMarketOrder({
    tokenId: 'TOKEN_ID',
    side: 'BUY',
    amount: 10 // 10 USDC
});
```

### 5. Market Finder (`market_finder.ts`)

Auto-detect and search for markets.

```typescript
import { MarketFinder } from './market_finder';

const finder = new MarketFinder();
const market = await finder.findCurrentBitcoinMarket();
console.log(market.tokens); // UP and DOWN tokens
```

## Safety Features

- ✅ Confirmation prompts before placing orders
- ✅ Price validation and sanity checks
- ✅ Automatic market price buffers
- ✅ Private key never exposed in logs
- ✅ Error handling and recovery

## Development

```bash
start-bot.ps1

```bash
# Watch mode (auto-reload)
npm run dev

# Type checking
npx tsc --noEmit

# Lint
npx eslint src/
```

## Security Notes

⚠️ **IMPORTANT:**
- Never commit your `.env` file
- Keep your private key secure
- Test with small amounts first
- Review all transactions before confirming

## Dependencies

- `@polymarket/clob-client` - Official Polymarket CLOB client
- `ethers` - Ethereum wallet and cryptography
- `axios` - HTTP requests
- `dotenv` - Environment variable management
- `typescript` - Type safety and modern JavaScript

## License

ISC

## Support

For issues or questions, please refer to:
- [Polymarket Documentation](https://docs.polymarket.com)
- [CLOB API Documentation](https://docs.polymarket.com/#clob-api)

---

**Disclaimer**: Use at your own risk. This software is provided as-is without warranties. Always test with small amounts first.

