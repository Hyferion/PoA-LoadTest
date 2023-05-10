import { ethers } from "ethers";
import { sendTx } from "./loadTest";

export const tx1 = async () => {
    // just send ETH
    const wallet = ethers.Wallet.createRandom(ethers.providers);
    await sendTx({to:wallet.address, value: ethers.utils.parseUnits("0.0001")});
}
