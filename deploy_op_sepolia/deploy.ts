import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log('deployL2 hre.network.config.chainId', hre.network.config.chainId)
    console.log('deployL2 hre.network.name', hre.network.name)

    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;
    console.log('deployer', deployer)

    //==== USDT =================================
    const L1_USDT= '0x42d3b260c761cD5da022dB56Fe2F89c4A909b04A'

    const USDTDeployer = await deploy("USDT", {
        from: deployer,
        args: [
            '0x4200000000000000000000000000000000000010',
            L1_USDT
        ],
        log: true,
        deterministicDeployment: false,
    });
    console.log('USDT', USDTDeployer.address)

    //==== verify =================================

    if (hre.network.name != "hardhat") {
        await hre.run("etherscan-verify", {
            network: hre.network.name
        });
    }

};

export default deployContract;
deployContract.tags = [
    'deployContract'
];