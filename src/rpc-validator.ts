/**
 * Simple RPC validator to replace rpc-validator package
 */
import axios from 'axios';

/**
 * Validates if an RPC endpoint is accessible
 */
export async function isValidrpc(rpcUrl: string): Promise<boolean> {
    try {
        const response = await axios.post(
            rpcUrl,
            {
                jsonrpc: '2.0',
                method: 'eth_blockNumber',
                params: [],
                id: 1
            },
            {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.status === 200 && response.data && !response.data.error;
    } catch (error) {
        return false;
    }
}

/**
 * Close connection (no-op for HTTP requests)
 */
export function closeConnection(): void {
    // No-op for HTTP requests
}

