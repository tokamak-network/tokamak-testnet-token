// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const { ethers, run } = require("hardhat");

async function main() {

  // Depolia USDC  0x693a591A27750eED2A0e14BC73bB1F313116a1cb
  const l2Bridge = "0x4200000000000000000000000000000000000010"
  const l1Token = "0x693a591A27750eED2A0e14BC73bB1F313116a1cb"
  const tokenName = 'USD Coin'
  const tokenSymbol = 'USDC'
  const owner = "0xc1eba383D94c6021160042491A5dfaF1d82694E6"
  const decimals = 6;

  //https://goerli.explorer.tokamak.network/address/0x98F4df7C282F26C8992801f495c0060AfcE45bb9/contracts#address-tabs
  const l2usdc = await hre.ethers.deployContract("OVMFiatToken",
    [l2Bridge,
    l1Token,
    owner,
    tokenName,
    tokenSymbol,
    decimals]
  );

  await l2usdc.waitForDeployment();

  console.log("L2 USDC Token deployed to:", l2usdc.target);

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
