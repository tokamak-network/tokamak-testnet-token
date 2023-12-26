// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const { ethers, run } = require("hardhat");
//USDT 0xB63B7Cdc26Cd4D944A801e1df9cc0458671e2aDC
async function main() {
  const l2Bridge = '0x4200000000000000000000000000000000000010'
  const l1Token = '0x42d3b260c761cD5da022dB56Fe2F89c4A909b04A'

  //==== USDT =================================
  const USDTDeposit_ = await ethers.getContractFactory("USDT");
  const usdt = await USDTDeposit_.deploy(l2Bridge, l1Token);
  await usdt.deployed();
  console.log('USDT' , usdt.address)

  await run("verify", {
    address: usdt.address,
    constructorArgsParams: [
      l2Bridge,
      l1Token
    ],
  });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
