// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Signer } from "@ethersproject/abstract-signer";
import { ethers, waffle } from "hardhat";
import { CountryImmigration, TaxRefundStorage } from "../typechain";

const provider = waffle.provider;

async function main() {
  const deployer: Signer = (await ethers.getSigners())[0];
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

  let tx = await deployer.sendTransaction({
    to: thCountryImmigration.address,
    value: ethers.utils.parseEther('1000')
  });
  await tx.wait();

  tx = await deployer.sendTransaction({
    to: deCountryImmigration.address,
    value: ethers.utils.parseEther('1000')
  });
  await tx.wait();

  console.log("Contract has :", ethers.utils.formatEther(await provider.getBalance(thCountryImmigration.address)), " ethers");
  console.log("Contract has :", ethers.utils.formatEther(await provider.getBalance(deCountryImmigration.address)), " ethers");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
