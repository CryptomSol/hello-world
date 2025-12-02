@echo off
setlocal enabledelayedexpansion

echo Loading environment variables...

for /f "usebackq tokens=1,* delims==" %%a in (".env") do (
    if not "%%a"=="" if not "%%a:~0,1%"=="#" (
        set "%%a=%%b"
    )
)

echo Starting Auto Trading Bot...
ts-node src/auto_trading_bot.ts

