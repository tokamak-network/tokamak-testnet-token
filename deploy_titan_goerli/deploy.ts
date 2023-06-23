import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log('deployL2 hre.network.config.chainId', hre.network.config.chainId)
    console.log('deployL2 hre.network.name', hre.network.name)

    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;
    console.log('deployer', deployer)

    //==== OVMFiatToken =================================
    const L1_USDC= '0x07865c6e87b9f70255377e024ace6630c1eaa37f'
    const owner = '0xc1eba383D94c6021160042491A5dfaF1d82694E6'
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
    const L1_USDT= '0xfad6367e97217cc51b4cd838cc086831f81d38c2'

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