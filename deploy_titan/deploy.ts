import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log('deployL2 hre.network.config.chainId', hre.network.config.chainId)
    console.log('deployL2 hre.network.name', hre.network.name)

    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;
    console.log('deployer', deployer)

    //==== OVMFiatToken =================================
    const L1_USDC= '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
    const owner = ' '
    const USDC_NAME = 'USD Coin'
    const USDC_SYMBOL = 'USDC'
    const USDC_DECIMAL = 6

    const OVMFiatTokenDeployer = await deploy("OVMFiatToken", {
        from: deployer,
        args: [
            '0x4200000000000000000000000000000000000010',
            L1_USDC,
            owner,
            USDC_NAME,
            USDC_SYMBOL,
            USDC_DECIMAL
        ],
        log: true,
        deterministicDeployment: true,
    });
    console.log('OVMFiatToken', OVMFiatTokenDeployer.address)

    //==== USDT =================================
    const L1_USDT= '0xdac17f958d2ee523a2206206994597c13d831ec7'

    const USDTDeployer = await deploy("USDT", {
        from: deployer,
        args: [
            '0x4200000000000000000000000000000000000010',
            L1_USDT
        ],
        log: true,
        deterministicDeployment: true,
    });
    console.log('USDT', USDTDeployer.address)

    //==== verify =================================

    // if (hre.network.name != "hardhat") {
    //     await hre.run("etherscan-verify", {
    //         network: hre.network.name
    //     });
    // }

};

export default deployContract;
deployContract.tags = [
    'deployContract'
];