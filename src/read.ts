// Imports
// ========================================================
import { abi } from './greeterContract';
import { createPublicClient, http } from 'viem';
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

    // Read from contract
    const result = await publicClient.readContract({
        abi: abi,
        address: `${process.env.CONTRACT_ADDRESS}` as `0x${string}`,
        functionName: "getGreeting"
    });
    console.log({ result });

    console.groupEnd();
})();