import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import CountryImmigrationABI from "../artifacts/contracts/CountryImmigration.sol/CountryImmigration.json";
import TaxRefundStorageABI from "../artifacts/contracts/TaxRefundStorage.sol/TaxRefundStorage.json";
import { TaxRefundStorage, CountryImmigration } from "../typechain";
import { Signer } from "@ethersproject/abstract-signer";
const { deployContract } = waffle;
describe("TaxRefund Contract", function () {
  let taxRefund: TaxRefundStorage;
  let th_countryImmigration: CountryImmigration;
  let german_countryImmigration: CountryImmigration;
  let deployer: Signer;
  let th_admin: Signer;
  let german_admin: Signer;
  let shop: Signer;
  let buyer: Signer;
  before(async function () {
    [deployer, th_admin, german_admin, shop, buyer] = await ethers.getSigners();
    taxRefund = (await deployContract(deployer, TaxRefundStorageABI)) as TaxRefundStorage;
    await taxRefund.deployed();

    th_countryImmigration = (await deployContract(deployer, CountryImmigrationABI, ['TH', 700, taxRefund.address])) as CountryImmigration;
    german_countryImmigration = (await deployContract(deployer, CountryImmigrationABI, ['DE', 1900, taxRefund.address])) as CountryImmigration;
    await th_countryImmigration.deployed();
    await german_countryImmigration.deployed();

    //set refundAddress
    const setTHRefundContract = await taxRefund.setRefundAddress('TH', th_countryImmigration.address);
    await setTHRefundContract.wait();
    const setGermanRefundContract = await taxRefund.setRefundAddress('DE', german_countryImmigration.address);
    await setGermanRefundContract.wait();

    //create admin
    const createTHAdminTx = await taxRefund.createAdmin(await th_admin.getAddress(), 'TH');
    await createTHAdminTx.wait();
    const createGermanAdminTx = await taxRefund.createAdmin(await german_admin.getAddress(), 'DE');
    await createGermanAdminTx.wait();

    //create shop
    const createGermanShopTx = await taxRefund.createShop(await shop.getAddress(), "7-Eleven", 'DE');
    await createGermanShopTx.wait();
  });


  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await taxRefund.owner()).to.equal(await deployer.getAddress());
      expect(await th_countryImmigration.owner()).to.equal(await deployer.getAddress());
      expect(await german_countryImmigration.owner()).to.equal(await deployer.getAddress());
    });

    it("Country Immigration property should be right", async function () {
      expect(await th_countryImmigration.vatRatio()).to.equal(700);
      expect(await german_countryImmigration.vatRatio()).to.equal(1900);
    });

    it("Admin is set correctly", async function () {
      const _th_admin = await taxRefund.admins(await th_admin.getAddress());
      const _de_admin = await taxRefund.admins(await german_admin.getAddress());
      expect(_th_admin.isAdmin).to.be.true;
      expect(_de_admin.isAdmin).to.be.true;
      expect(_th_admin.country).to.equal('TH');
      expect(_de_admin.country).to.equal('DE');
      expect(((await taxRefund.admins(await shop.getAddress())).isAdmin)).to.be.false;
    });

    it("Shop is created correctly", async function () {
      const _shop = await taxRefund.shops(await shop.getAddress());
      expect(_shop.exists).to.be.true;
      expect(_shop.shopName).to.equal('7-Eleven');
      expect(_shop.country).to.equal('DE');
    });
  });
});
