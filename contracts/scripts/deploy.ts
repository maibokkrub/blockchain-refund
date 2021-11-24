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
  const { deployer, thAdmin, deAdmin, shop, buyer,shopTH, taxRefund, thCountryImmigration, deCountryImmigration, multicall } = await init();

  console.log("tagRefund address :", taxRefund.address);
  console.log("thCountryImmigration address :", thCountryImmigration.address);
  console.log("deCountryImmigration address :", deCountryImmigration.address);
  console.log("multicall address:", multicall.address);

  await (await taxRefund.connect(shop).createOrder(await buyer.getAddress(),"Mercedes Benz",ethers.utils.parseEther('100'),1)).wait();
  await (await taxRefund.connect(shop).createOrder(await buyer.getAddress(),"Nike shoes",ethers.utils.parseEther('0.5'),2)).wait();
  await (await taxRefund.connect(shop).createOrder(await buyer.getAddress(),"Adidas shoes",ethers.utils.parseEther('0.5'),2)).wait();
  await (await taxRefund.connect(shopTH).createOrder(await buyer.getAddress(),"Louis Vuitton bag",ethers.utils.parseEther('2'),2)).wait();
  await (await taxRefund.connect(shopTH).createOrder(await buyer.getAddress(),"Gucci necklace",ethers.utils.parseEther('3'),1)).wait();
  await (await taxRefund.connect(shopTH).createOrder(await buyer.getAddress(),"TOTO",ethers.utils.parseEther('1000'),1)).wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
