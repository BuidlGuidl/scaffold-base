import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployTrustScriptShop: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
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

  const trustScriptToken = await hre.ethers.getContract<Contract>("TrustScriptToken", deployer);
  const trustScriptTokenAddress = await trustScriptToken.getAddress();

  const trustScriptProductReviewAttester = await hre.ethers.getContract<Contract>(
    "TrustScriptProductReviewAttester",
    deployer,
  );
  const trustScriptProductReviewAttesterAddress = await trustScriptProductReviewAttester.getAddress();

  await deploy("TrustScriptShop", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, trustScriptTokenAddress, trustScriptProductReviewAttesterAddress],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  //Add 6 products
  const trustScriptShop = await hre.ethers.getContract<Contract>("TrustScriptShop", deployer);

  const productNames = ["Coin Cap", "Bitcoin Hoodie", "Brian Beanie", "Onchain Pin", "Coinbrew", "T-shirt"];

  for (let i = 1; i <= 6; i++) {
    const product = {
      id: i,
      name: productNames[i - 1],
      priceInETH: hre.ethers.parseEther((0.001 * i).toString()),
      priceInToken: hre.ethers.parseEther((1 * i).toString()),
    };

    console.log(`Adding product ${i} to TrustScript Shop`);
    await trustScriptShop.addProduct(product);
  }

  // Base Sepolia
  // await trustScriptShop.transferOwnership("0x35fAadD6fC68619b72A7Bfb871eDcC069C2f1bc3");

  // Localhost
  await trustScriptShop.transferOwnership("0xc9a57d319f875A4EdC48b4efE89c803daBCFA71c");
};

export default deployTrustScriptShop;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployTrustScriptShop.tags = ["TrustScriptShop"];
