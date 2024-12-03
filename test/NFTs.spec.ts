import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("UniqueProductNFT", function () {
  let UniqueProductNFT: ContractFactory;
  let nftContract: Contract;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    UniqueProductNFT = await ethers.getContractFactory("UniqueProductNFT");
    [owner, user1, user2] = await ethers.getSigners();
    nftContract = await UniqueProductNFT.deploy();
    await nftContract.waitForDeployment();
  });

  it("should mint a new NFT", async function () {
    const tokenURI = "https://example.com/token/1";
    await nftContract.mintProduct(user1.address, tokenURI);
    expect(await nftContract.ownerOf(1)).to.equal(user1.address);
    expect(await nftContract.totalMinted()).to.equal(1);
  });

  it("should not mint more than MAX_PRODUCTS", async function () {
    const tokenURI = "https://example.com/token/";
    for (let i = 0; i < 10000; i++) {
      await nftContract.mintProduct(user1.address, tokenURI + i);
    }
    await expect(nftContract.mintProduct(user1.address, tokenURI + "10001")).to.be.revertedWith("All products have been minted");
  });

  describe("Retrieving NFTs", function () {
    beforeEach(async function () {
      await nftContract.mintProduct(user1.address, "https://example.com/token/1");
      await nftContract.mintProduct(user1.address, "https://example.com/token/2");
      await nftContract.mintProduct(user2.address, "https://example.com/token/3");
    });

    it("should get all NFTs for a user", async function () {
      const user1NFTs = await nftContract.getAllNFTs(user1.address);
      expect(user1NFTs.length).to.equal(2);
      expect(user1NFTs[0].toString()).to.equal("1");
      expect(user1NFTs[1].toString()).to.equal("2");
    });

    it("should get all token URIs for a user", async function () {
      const user1TokenURIs = await nftContract.getTokenURIs(user1.address);
      expect(user1TokenURIs.length).to.equal(2);
      expect(user1TokenURIs[0]).to.equal("https://example.com/token/1");
      expect(user1TokenURIs[1]).to.equal("https://example.com/token/2");
    });

    it("should get ALL token URIs", async function () {
      const allTokenURIs = await nftContract.getALLTokenURIs();
      expect(allTokenURIs.length).to.equal(3);
      expect(allTokenURIs[2]).to.equal("https://example.com/token/3");
    });
  });

  describe("Check-in functionality", function () {
    it("should mint a check-in NFT and mark user as checked in", async function () {
      const tokenURI = "https://example.com/checkin/1";
      await nftContract.mintCheckInProduct(user1.address, tokenURI);
      expect(await nftContract.isCheckedIn(user1.address)).to.be.true;
      expect(await nftContract.ownerOf(1)).to.equal(user1.address);
    });

    it("should return false for non-checked in users", async function () {
      expect(await nftContract.isCheckedIn(user2.address)).to.be.false;
    });
  });

  describe("Ownership and access control", function () {
    it("should allow only owner to mint NFTs", async function () {
      await expect(nftContract.connect(user1).mintProduct(user1.address, "https://example.com/token/1"))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should allow owner to transfer ownership", async function () {
      await nftContract.transferOwnership(user1.address);
      expect(await nftContract.owner()).to.equal(user1.address);
    });
  });

  describe("Edge cases and limitations", function () {
    it("should handle minting and retrieving for multiple users", async function () {
      const signers = await ethers.getSigners();
      for (let i = 0; i < 5; i++) {
        await nftContract.mintProduct(signers[i].address, `https://example.com/token/${i}`);
      }

      for (let i = 0; i < 5; i++) {
        const userNFTs = await nftContract.getAllNFTs(signers[i].address);
        expect(userNFTs.length).to.equal(1);
        expect(userNFTs[0].toString()).to.equal((i + 1).toString());
      }
    });

    it("should return empty arrays for users with no NFTs", async function () {
      const noNFTs = await nftContract.getAllNFTs(user2.address);
      const noURIs = await nftContract.getTokenURIs(user2.address);
      expect(noNFTs.length).to.equal(0);
      expect(noURIs.length).to.equal(0);
    });
  });
});

