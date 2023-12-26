// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const { ethers, run } = require("hardhat");
const USDCABI = require("../artifacts/contracts/OVMFiatToken.sol/OVMFiatToken.json")

async function main() {

  let deployers = await ethers.getSigners();
  let deployer = deployers[0]

  // mainnet USDC 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
  const l2Bridge = "0x4200000000000000000000000000000000000010"
  const l1Token = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  const tokenName = 'USD Coin'
  const tokenSymbol = 'USDC'
  //const owner = "0x340C44089bc45F86060922d2d89eFee9e0CDF5c7"
  const decimals = 6;
  let factory = new hre.ethers.ContractFactory(USDCABI.abi, USDCABI.bytecode, deployer);
  const contract = await factory.deploy(
      l2Bridge,
      l1Token,
      owner,
      tokenName,
      tokenSymbol,
      decimals
      );

  await contract.deployed();

  console.log("L2 USDC Token deployed to:", contract.address);

  // const l2usdc = await hre.ethers.deployContract("OVMFiatToken",
  //   [l2Bridge,
  //   l1Token,
  //   owner,
  //   tokenName,
  //   tokenSymbol,
  //   decimals]
  // );

  // await l2usdc.waitForDeployment();

  // console.log("L2 USDC Token deployed to:", l2usdc.target);

  // await run("verify", {
  //   address: l2usdc.target,
  //   constructorArgsParams: [
  //     l2Bridge,
  //     l1Token,
  //     owner,
  //     tokenName,
  //     tokenSymbol,
  //     decimals
  //   ],
  // });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
