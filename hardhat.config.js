require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

module.exports = {
  solidity: "0.8.9",
  networks: {
    "hardhat": {
      accounts: { mnemonic: "test test test test test test test test test test test junk" }
    },
    "goerli": {
      url: `${process.env.ETH_NODE_URI_GOERLI}`,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    "titan-goerli": {
      url: 'https://goerli.optimism.tokamak.network',
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    "titan": {
      url: 'https://rpc.titan.tokamak.network',
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      "titan-goerli":"32IKRJ11RVV4GRTSYCZ9FKQAXH9H769VJS",
      "titan":"32IKRJ11RVV4GRTSYCZ9FKQAXH9H769VJS"
    },
    customChains: [
      {
        network: "titan-goerli",
        chainId: 5050,
        urls: {
          apiURL: "https://goerli.explorer.tokamak.network/api",
          browserURL: "https://goerli.explorer.tokamak.network"
        }
      },
      {
        network: "titan",
        chainId: 55004,
        urls: {
          apiURL: "https://explorer.titan.tokamak.network/api",
          browserURL: "https://explorer.titan.tokamak.network"
        }
      }
    ]
  },
};
