const env = require("../config/config");
const ethers = require("ethers");

async function sendETH() {
  const wallet = new ethers.Wallet(
    // Test account's fixed private key in hardhat local node
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    ethers.getDefaultProvider(env.apiUrl)
  );
  const tx = await wallet.sendTransaction({
    to: env.pubKey,
    value: ethers.constants.WeiPerEther.mul(10),
  });
  await tx.wait();
  console.log(`Transferred 10 ETH to ${env.pubKey}`);
}

sendETH();
