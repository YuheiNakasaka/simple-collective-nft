const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TeigashitsuArtNFT", function () {
  it("Should return the owned tokens", async function () {
    const [owner] = await ethers.getSigners();
    const TeigashitsuArtNFT = await ethers.getContractFactory(
      "TeigashitsuArtNFT"
    );
    const nft = await TeigashitsuArtNFT.deploy();
    await nft.deployed();

    expect(await nft.ownedTokens()).to.equal([]);
  });
});
