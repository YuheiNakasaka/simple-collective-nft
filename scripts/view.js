const env = require("../config/config");
const ethers = require("ethers");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(env.apiUrl);
const contract = require("../artifacts/contracts/TeigashitsuArtNFT.sol/TeigashitsuArtNFT.json");
const contractAddress = env.contAddr;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function viewTokens() {
  await nftContract.methods
    .ownedTokens()
    // callの引数が.solの方のmsg.senderになる
    .call({ from: env.pubKey }, function (err, res) {
      if (err) {
        console.log(err);
      }
      console.log(res);
    });
}

viewTokens();
