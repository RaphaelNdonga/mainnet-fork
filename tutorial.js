const { ethers } = require("ethers");
const axios = require("axios");
require("dotenv").config();

const provider = ethers.providers.getDefaultProvider("http://127.0.0.1:8545");
const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const curveAddress = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7";
const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${curveAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`

async function main() {
    const wallet = new ethers.Wallet(process.env.WALLET_SECRET);
    const connectedWallet = wallet.connect(provider);
    // const response = await axios.get("https://api.etherscan.io/api?module=contract&action=getabi&address=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    // const ERC20abi = response.data.result;
    // const wethContract = new ethers.Contract(WETHAddress, ERC20abi, provider);
    // const name = await wethContract.name();

    // console.log("----------WETH----------")
    // console.log("weth contract name: ", name);

    // const txn = await wethContract.connect(connectedWallet).approve(
    //     curveAddress,
    //     ethers.utils.parseEther("0.01")
    // )

    // const receipt = await txn.wait();
    // console.log("Txn block number: ", receipt.blockNumber)

    console.log("----------CURVE AMM----------")

    const curveResponse = await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${curveAddress}`);
    const curveABI = curveResponse.data.result;
    const curveContract = new ethers.Contract(curveAddress, curveABI, provider);
    console.log("curve contract: ", curveContract);
    const owner = await curveContract.connect(connectedWallet).owner({
        gasLimit: "1000000"
    })
    // const name = await curveContract.name();
    const fee = await curveContract.connect(connectedWallet).fee({
        gasLimit: "1000000"
    })
    console.log(owner);
    console.log(fee);

}

main();