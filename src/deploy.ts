// Imports
// ========================================================
import { abi, bytecode } from './greeterContract';
import { createPublicClient, http, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { polygonMumbai, polygonZkEvmTestnet } from 'viem/chains';
import dotenv from 'dotenv';

// Config
// ========================================================
dotenv.config();
const rpc = "https://rpc-mumbai.maticvigil.com";

const account = privateKeyToAccount(`0x${process.env.WALLET_PRIVATE_KEY}`);
const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(rpc),
});
const walletClient = createWalletClient({
    account,
    chain: polygonMumbai,
    transport: http(rpc),
});

// Main Function
// ========================================================
(async () => {
    console.group('Main Function');

    // Deploy contract and get transaction hash
    const hash = await walletClient.deployContract({
        abi: abi,
        bytecode: bytecode,
        args: ["Hello from @dylanjohn"],
    });
    console.log({ hash });

    // Get receipt of transaction successfully completed
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log({ receipt });

    // Get deployed contract address
    console.log(`Contract successfully deployed to ${receipt.contractAddress}`);

    console.groupEnd();
})();

