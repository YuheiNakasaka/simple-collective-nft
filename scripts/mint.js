const env = require("../config/config");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(env.apiUrl);
const contract = require("../artifacts/contracts/TeigashitsuArtNFT.sol/TeigashitsuArtNFT.json");

const contractAddress = env.contAddr;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(env.pubKey, "latest");
  const tx = {
    from: env.pubKey,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(env.pubKey, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, env.priKey);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log("Promise failed:", err);
    });
}

if (process.argv.length == 3) {
  const ntfMetaDataURL = process.argv[2];
  mintNFT(ntfMetaDataURL);
}
