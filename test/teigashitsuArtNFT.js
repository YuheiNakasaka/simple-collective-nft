const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("TeigashitsuArtNFT", function () {
  let owner;
  let other;
  let nft;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    const TeigashitsuArt = await ethers.getContractFactory("TeigashitsuArtNFT");
    nft = await TeigashitsuArt.deploy();
    await nft.deployed();
  });

  describe("mintNFT", function () {
    describe("owner", function () {
      it("should mint a token with the given tokenURL", async function () {
        const tokenURL = "https://example.com/nft001";
        const conn = await nft.connect(owner);
        await conn.mintNFT(owner.address, tokenURL);
        expect(await conn.balanceOf(owner.address)).to.equal(1);
      });
    });

    describe("someone except owner", function () {
      it("should throw Ownable Exception", async function () {
        const tokenURL = "https://example.com/nft001";
        const conn = await nft.connect(other);
        await conn
          .mintNFT(owner.address, tokenURL)
          .then(function (_) {})
          .catch(function (err) {
            assert.equal(
              err.message,
              "Error: VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
            );
          });
      });
    });
  });

  describe("OwnedTokens", function () {
    describe("owner", function () {
      it("should return [] with nothing owned", async function () {
        const conn = await nft.connect(owner);
        const actual = await conn.ownedTokens();
        expect(actual.length === 0).to.be.true;
      });

      it("should return tokens", async function () {
        const tokenURL = "https://example.com/nft001";
        const conn = await nft.connect(owner);
        await conn.mintNFT(owner.address, tokenURL);
        const actual = await conn.ownedTokens();
        expect(actual.length === 1).to.be.true;
        expect(actual[0] === tokenURL).to.be.true;
      });
    });

    describe("someone except owner", function () {
      it("should throw Ownable Exception", async function () {
        const conn = await nft.connect(other);
        await conn
          .ownedTokens()
          .then(function (_) {})
          .catch(function (err) {
            assert.equal(
              err.message,
              "Error: VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
            );
          });
      });
    });
  });
});
