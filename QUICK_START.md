# Auto Trading Bot - Quick Start

## What This Bot Does

Automatically trades Polymarket prediction markets to profit from price discrepancies between a software price oracle and actual market prices.

## How to Run

### 1. Install Dependencies
```bash
cd polymarket-ts-bot
npm install
```

### 2. Configure Environment
Edit `.env` file:
```env
PRIVATE_KEY=0xYourPrivateKeyHere
SOFTWARE_WS_URL=ws://45.130.166.119:5001
PRICE_DIFFERENCE_THRESHOLD=0.015
STOP_LOSS_AMOUNT=0.005
TAKE_PROFIT_AMOUNT=0.01
DEFAULT_TRADE_AMOUNT=5.0
TRADE_COOLDOWN=30
```

### 3. Generate Credentials
```bash
npm run gen-creds
```

### 4. Start Auto Trading
```bash
npm run auto-trade
```

## What Happens When Running

```
1. Bot connects to software price oracle (WebSocket)
2. Bot connects to Polymarket price feed (WebSocket)
3. Bot monitors price differences continuously
4. When opportunity detected (difference > $0.015):
   → Places BUY order immediately
   → Places TAKE PROFIT sell order (+$0.01)
   → Places STOP LOSS sell order (-$0.005)
5. Repeats every 30 seconds (cooldown)
```

## Example Output

```
Starting Auto Trading Bot...
Wallet: 0xda2d...b263
Finding current Bitcoin market...
Market found: Bitcoin Up or Down - November 22, 9AM ET
UP Token: 74767151816109143033...
DOWN Token: 24201538121789638558...
Software WebSocket connected
Polymarket WebSocket connected
Bot started successfully!

🎯 Trade opportunity detected!
Token: UP
Software Price: $0.7500
Polymarket Price: $0.7300
Difference: $0.0200

📊 Executing trade...
Buying 6.8493 shares at $0.7300
✅ Buy order placed: abc123...
✅ Take Profit order placed at $0.7400
✅ Stop Loss order placed at $0.7250
✅ Trade execution complete!
```

## Risk Management

| Risk Level | Trade Amount | Stop Loss | Take Profit |
|-----------|--------------|-----------|-------------|
| Conservative | $5 | $0.005 | $0.01 |
| Moderate | $10 | $0.01 | $0.02 |
| Aggressive | $20 | $0.02 | $0.04 |

**Recommendation**: Start with Conservative ($5 trades) for first week.

## Stopping the Bot

Press `Ctrl+C` to stop the bot gracefully.

## Files Created

- `.credentials.json` - Your API credentials (git-ignored)
- Trade logs in console output

## Troubleshooting

### "Private key not found"
→ Add your private key to `.env` file

### "No active Bitcoin market found"
→ Bot runs on hourly Bitcoin markets. Wait for next hour.

### "Insufficient balance"
→ Fund wallet with USDC on Polygon network

### "Connection failed"
→ Check internet connection and firewall settings

## Performance Tracking

Monitor these metrics:
- **Win Rate**: Target 60-70%
- **Average Profit**: Target $0.01+ per trade
- **Daily Profit**: Target $1-5+ (with $5 trades)

## Safety Features

✅ Stop loss protects against large losses
✅ Take profit locks in gains automatically
✅ Cooldown prevents overtrading
✅ Threshold filters out small opportunities
✅ Automatic reconnection on disconnect

## Next Steps

1. Run bot for 24 hours with $5 trades
2. Track results (wins vs losses)
3. If profitable after 20+ trades, consider scaling up
4. Read `PROFIT_STRATEGY.md` for detailed strategy explanation

## Support

For issues or questions:
- Check `PROFIT_STRATEGY.md` for strategy details
- Check `CREDENTIALS_GUIDE.md` for credential issues
- Review `README.md` for full documentation

