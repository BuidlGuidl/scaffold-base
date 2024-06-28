import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourToken" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployTrustScriptToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Base Sepolia
  // await deploy("TrustScriptToken", {
  //   from: deployer,
  //   // Contract constructor arguments
  //   args: ["0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"],
  //   log: true,
  //   //   // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
  //   //   // automatically mining the contract deployment transaction. There is no effect on live networks.
  //   autoMine: true,
  // });

  // Localhost
  await deploy("TrustScriptToken", {
    from: deployer,
    // Contract constructor arguments
    args: ["0xc9a57d319f875A4EdC48b4efE89c803daBCFA71c"],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
};

export default deployTrustScriptToken;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourToken
deployTrustScriptToken.tags = ["TrustScriptToken"];
