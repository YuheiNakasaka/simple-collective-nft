const { ethers } = require("hardhat");
const hre = require("hardhat");
const ContractName = "TeigashitsuArtNFT";

async function main() {
  const TeigashitsuArtNFT = await hre.ethers.getContractFactory(ContractName);
  const teigashitsuArtNFT = await TeigashitsuArtNFT.deploy();
  await teigashitsuArtNFT.deployed();
  console.log("TeigashitsuArtNFT deployed to:", teigashitsuArtNFT.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
