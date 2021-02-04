// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ganache");
// require("@nomiclabs/hardhat-truffle5");

import { task } from "hardhat/config"
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ganache";
import { HardhatUserConfig } from "hardhat/config";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
  solidity: "0.4.21",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env['ALCHEMYIO_KEY']}`,
      accounts: [process.env['RINKEBY_PRIV_KEY1']]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 200000
  }
};

export default config;

