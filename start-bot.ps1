$envFile = Get-Content .env -Raw
$lines = $envFile -split "`n"

foreach ($line in $lines) {
    $line = $line.Trim()
    if ($line -and !$line.StartsWith("#")) {
        $parts = $line -split "=", 2
        if ($parts.Length -eq 2) {
            $key = $parts[0].Trim()
            $value = $parts[1].Trim()
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
            Write-Host "Loaded: $key"
        }
    }
}

Write-Host "`nStarting Auto Trading Bot...`n"
npm run auto-trade

