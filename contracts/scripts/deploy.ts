// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { CountryImmigration, TaxRefundStorage } from "../typechain";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const taxRefundContract = await ethers.getContractFactory("TaxRefundStorage");
  const taxRefund = (await taxRefundContract.deploy()) as TaxRefundStorage;

  await taxRefund.deployed();

  const countryImmigrationContract = await ethers.getContractFactory("CountryImmigration");
  const thCountryImmigration = (await countryImmigrationContract.deploy('TH', 700, taxRefund.address)) as CountryImmigration;
  const deCountryImmigration = (await countryImmigrationContract.deploy('DE', 1900, taxRefund.address)) as CountryImmigration;

  await thCountryImmigration.deployed();
  await deCountryImmigration.deployed();

  console.log("TagRefund deployed to:", taxRefund.address);
  console.log("TH Immigration deployed to:", thCountryImmigration.address);
  console.log("Germany Immigration deployed to:", deCountryImmigration.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
