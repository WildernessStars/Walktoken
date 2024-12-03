import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("WalkToken", function () {
  let WalkToken: ContractFactory;
  let walkToken: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    WalkToken = await ethers.getContractFactory("WalkToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    walkToken = await WalkToken.deploy();
    await walkToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await walkToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await walkToken.balanceOf(owner.address);
      expect(await walkToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should have correct name and symbol", async function () {
      expect(await walkToken.name()).to.equal("WalkToken");
      expect(await walkToken.symbol()).to.equal("WLK");
    });

    it("Should have correct decimals", async function () {
      expect(await walkToken.decimals()).to.equal(3);
    });
  });

  describe("Token minting", function () {
    it("Should mint correct amount of tokens based on steps", async function () {
      await walkToken.mintTokens(addr1.address, 1000);
      expect(await walkToken.balanceOf(addr1.address)).to.equal(1000);
    });

    it("Should not allow minting twice in the same day", async function () {
      await walkToken.mintTokens(addr1.address, 1000);
      await expect(walkToken.mintTokens(addr1.address, 1000)).to.be.revertedWith(
        "Address can only receive tokens once per day"
      );
    });

    it("Should allow minting on different days", async function () {
      await walkToken.mintTokens(addr1.address, 1000);
      
      // Simulate next day
      await ethers.provider.send("evm_increaseTime", [24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);

      await walkToken.mintTokens(addr1.address, 2000);
      expect(await walkToken.balanceOf(addr1.address)).to.equal(3000);
    });

    it("Should not mint if total supply cap is exceeded", async function () {
      const cap = 1_000_000 * (10 ** 3); // 1,000,000 tokens with 3 decimals
      await expect(walkToken.mintTokens(addr1.address, cap)).to.be.revertedWith(
        "Total supply cap exceeded"
      );
    });
  });

  describe("Token burning", function () {
    it("Should burn tokens correctly", async function () {
      await walkToken.mintTokens(addr1.address, 1000);
      await walkToken.burnTokens(addr1.address, 500);
      expect(await walkToken.balanceOf(addr1.address)).to.equal(500);
    });
  });

  describe("Quest system", function () {
    it("Should allow taking a quest", async function () {
      await walkToken.takeQuest(addr1.address);
      expect(await walkToken.hasQuest(addr1.address)).to.be.true;
    });

    it("Should allow finishing a quest", async function () {
      await walkToken.takeQuest(addr1.address);
      await walkToken.finishQuest(addr1.address);
      expect(await walkToken.hasDoneQuest(addr1.address)).to.be.true;
    });
  });

  describe("Utility functions", function () {
    it("Should convert steps to tokens correctly", async function () {
      expect(await walkToken.stepsToTokens(1000)).to.equal(1000);
    });
  });
});

