require("@nomicfoundation/hardhat-toolbox");
require('hardhat-abi-exporter');

let dotenv = require('dotenv')
dotenv.config({ path: "./.env" })

const PRIVATE_KEY1 = process.env.PRIVATEKEY
const mnemonic = process.env.MNEMONIC
const scankey = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  networks: {
    hardhat: {
      chainId: 31337,
      gas: 12000000,
      accounts: {
        mnemonic: mnemonic,
      },
    },
    goerli: {
      url: "https://eth-goerli.api.onfinality.io/public",
      accounts: [PRIVATE_KEY1],
      chainId: 5,
    },
    // polygon
    mumbai: {
      url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      accounts: {
        mnemonic: mnemonic,
      },
      chainId: 80001,
    },
  },

  etherscan: {
    apiKey: scankey
  },

  abiExporter: {
    path: './deployments/abi',
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: true,
  },

};