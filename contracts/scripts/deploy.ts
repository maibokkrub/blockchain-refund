// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Signer } from "@ethersproject/abstract-signer";
import { ethers, waffle } from "hardhat";
import { CountryImmigration, TaxRefundStorage } from "../typechain";
import { init } from "./utils";

const provider = waffle.provider;

async function main() {
  const { deployer, thAdmin, deAdmin, shop, buyer, taxRefund, thCountryImmigration, deCountryImmigration, multicall } = await init();

  console.log("tagRefund address :", taxRefund.address);
  console.log("thCountryImmigration address :", thCountryImmigration.address);
  console.log("deCountryImmigration address :", deCountryImmigration.address);
  console.log("multicall address:", multicall.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
