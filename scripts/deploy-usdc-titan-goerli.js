// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const { ethers, run } = require("hardhat");
const USDCABI = require("../artifacts/contracts/OVMFiatToken.sol/OVMFiatToken.json")
async function main() {
  // deploy USDC on tokamak goerli
  let deployers = await ethers.getSigners();
  let deployer = deployers[0]
  // Goerli USDC 0x07865c6e87b9f70255377e024ace6630c1eaa37f
  const l2Bridge = "0x4200000000000000000000000000000000000010"
  const l1Token = "0x07865c6e87b9f70255377e024ace6630c1eaa37f"
  const tokenName = 'USD Coin'
  const tokenSymbol = 'USDC'
  const owner = "0xc1eba383D94c6021160042491A5dfaF1d82694E6"
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

  //https://goerli.explorer.tokamak.network/address/0x98F4df7C282F26C8992801f495c0060AfcE45bb9/contracts#address-tabs
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
