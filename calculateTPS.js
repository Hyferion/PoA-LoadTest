const Web3 = require('web3');

const gethRpcUrl = process.env.RPC; // Replace with your Geth node's RPC URL
const web3 = new Web3(new Web3.providers.HttpProvider(gethRpcUrl));

const measureInterval = 10; // Time interval (in seconds) to measure TPS
let peakTPS = 0;

async function calculateTPS() {
    const startBlock = await web3.eth.getBlock('latest');
    const startTime = startBlock.timestamp;

    setTimeout(async () => {
        const endBlock = await web3.eth.getBlock('latest');
        const endTime = endBlock.timestamp;

        const blockCount = endBlock.number - startBlock.number;
        const txCount = (await Promise.all(
            [...Array(blockCount + 1).keys()].map(async i => {
                const block = await web3.eth.getBlock(startBlock.number + i);
                return block.transactions.length;
            })
        )).reduce((a, b) => a + b, 0);

        const elapsedTime = endTime - startTime;
        const tps = txCount / elapsedTime;

        if (tps > peakTPS) {
            peakTPS = tps;
        }

        console.log(`Current TPS: ${tps}`);
        console.log(`Peak TPS: ${peakTPS}`);

        // Continue measuring TPS
        calculateTPS();
    }, measureInterval * 1000);
}

calculateTPS();