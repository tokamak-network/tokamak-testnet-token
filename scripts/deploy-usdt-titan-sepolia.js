// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const { ethers, run } = require("hardhat");

async function main() {

  // sepolia USDT : 0x42d3b260c761cD5da022dB56Fe2F89c4A909b04A
  const l2Bridge = '0x4200000000000000000000000000000000000010'
  const l1Token = '0x42d3b260c761cD5da022dB56Fe2F89c4A909b04A'

  //
  //L2 USDT Token deployed to: 0x6AE0a402C6113E262c9A1E0636cCEc7B1B30DEDc
  const l2usdt = await hre.ethers.deployContract("USDT",
    [l2Bridge, l1Token]  );

  await l2usdt.waitForDeployment();


  console.log("L2 USDT Token deployed to:", l2usdt.target);

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
