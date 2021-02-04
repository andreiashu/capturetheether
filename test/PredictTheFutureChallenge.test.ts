import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Contract, Signer, utils } from "ethers";

const fromAddress = '0x2810d5E289f885d25437743A11C6159F82ca5d28';
describe("PredictTheFutureChallenge", function () {
  let owner: Signer;
  let attacker: Signer;

  let challenge: Contract;
  let solution: Contract;


  const getWei = (eth: string) => {
    return ethers.utils.parseEther(eth);
  };
  const getEth = (wei: BigNumber) => {
    return wei.div("1000000000000000000");
  };

  beforeEach(async function () {
    [attacker] = await ethers.getSigners();
  });

  it("Should predict", async function () {
    // const Challenge = await ethers.getContractFactory("PredictTheFutureChallenge", owner);
    // challenge = await Challenge.deploy({ value: utils.parseEther('1.0') });

    const Solution = await ethers.getContractFactory("PredictTheFutureSolution", attacker);
    solution = await Solution.deploy('0xF076E2e2d85b075A031484f8f0574a9aa75410d7', { value: getWei('1.0') });
    await solution.deployed();

    // for (let i = 0; i <= 1000; i++) {
    //   console.log(`[${i}] trickSettle...`);
    //   const receipt = await solution.trickSettle({from: fromAddress});
    //   await receipt.wait();

    //   if (true === await challenge.isComplete({ from: fromAddress })) {
    //     console.log(`done, withdrawing balance...`);
    //     await solution.withdraw({from: fromAddress});
    //     break;
    //   }
    // }
  });
})
