// Imports
// ========================================================
import { abi, bytecode } from './greeterContract';
import { createPublicClient, decodeEventLog, GetLogsParameters, http } from 'viem';
import { polygonMumbai } from 'viem/chains';
import dotenv from 'dotenv';

// Config
// ========================================================
dotenv.config();
const rpc = "https://rpc-mumbai.maticvigil.com";
const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(rpc),
});

// Main Function
// ========================================================
(async () => {
    console.group('Main Function');

    // Get current block number (adjust as needed)
    const blockNumber = await publicClient.getBlockNumber();
    console.log({ blockNumber });

    const filter = await publicClient.createContractEventFilter({
        abi: abi,
        address: `${process.env.CONTRACT_ADDRESS}` as `0x${string}`,
        eventName: 'NewGreeting',
        fromBlock: blockNumber - 100n,
        toBlock: blockNumber,
    })
    const logs = await publicClient.getFilterLogs({ filter });
    
    console.log('decoded topics (args)', logs[0].args)

    console.groupEnd();
})();
