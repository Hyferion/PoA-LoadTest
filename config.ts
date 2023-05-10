import { ethers } from "ethers";
import { config } from "dotenv";
config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
export const web3 = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);