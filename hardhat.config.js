require("@nomiclabs/hardhat-waffle");
const env = require("./config/config");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  if (process.env.DEV_ENV === "localhost") {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      timeout: 50000,
    },
    // rinkeby: {
    //   url: env.apiUrl,
    //   accounts: [`0x${env.priKey}`],
    // },
    mumbai: {
      url: env.apiUrl,
      accounts: [env.priKey],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    polygon: {
      url: env.apiUrl,
      accounts: [env.priKey],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};
