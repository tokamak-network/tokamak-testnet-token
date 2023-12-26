// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const { ethers, run } = require("hardhat");
const USDTABI = require("../artifacts/contracts/USDT.sol/USDT.json")

async function main() {

  let deployers = await ethers.getSigners();
  let deployer = deployers[0]

  // mainnet USDT 0xdac17f958d2ee523a2206206994597c13d831ec7
  const l2Bridge = '0x4200000000000000000000000000000000000010'
  const l1Token = '0xdac17f958d2ee523a2206206994597c13d831ec7'

  let factory = new hre.ethers.ContractFactory(USDTABI.abi, USDTABI.bytecode, deployer);
  const contract = await factory.deploy(
      l2Bridge,
      l1Token
      );

  await contract.deployed();

  console.log("L2 USDT Token deployed to:", contract.address);


  // const l2usdt = await hre.ethers.deployContract("USDT",
  //   [l2Bridge, l1Token]  );

  // await l2usdt.waitForDeployment();


  // console.log("L2 USDT Token deployed to:", l2usdt.target);

  // await run("verify", {
  //   address: l2usdt.target,
  //   constructorArgsParams: [
  //     l2Bridge,
  //     l1Token
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
