

import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import CountryImmigrationABI from "../artifacts/contracts/CountryImmigration.sol/CountryImmigration.json";
import TaxRefundStorageABI from "../artifacts/contracts/TaxRefundStorage.sol/TaxRefundStorage.json";
import { TaxRefundStorage, CountryImmigration } from "../typechain";
import { Signer } from "@ethersproject/abstract-signer";
import { TransactionResponse } from "@ethersproject/abstract-provider";
const { deployContract, provider } = waffle;
describe("TaxRefund Contract", function () {
    let taxRefund: TaxRefundStorage;
    let th_countryImmigration: CountryImmigration;
    let german_countryImmigration: CountryImmigration;
    let deployer: Signer;
    let th_admin: Signer;
    let german_admin: Signer;
    let shop: Signer;
    let buyer: Signer;
    let tx: TransactionResponse;
    beforeEach(async function () {
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

        tx = await deployer.sendTransaction({
            to: th_countryImmigration.address,
            value: ethers.utils.parseEther('1000')
        });
        await tx.wait();

        tx = await deployer.sendTransaction({
            to: german_countryImmigration.address,
            value: ethers.utils.parseEther('1000')
        });
        await tx.wait();
    });

    describe("German Admin cannot REJECT order", function () {
        before("Create 2 Order", async function () {
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Louis Vuitton", ethers.utils.parseEther('100'), 4);
            await tx.wait();
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Adidas Crop Top", ethers.utils.parseEther('50'), 2);
            await tx.wait();

            const orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            tx = await taxRefund.connect(th_admin).confirmOrder(await buyer.getAddress(), orders[0].id);
            await tx.wait();
            tx = await taxRefund.connect(th_admin).confirmOrder(await buyer.getAddress(), orders[1].id);
            await tx.wait();
        });

        it("[CONFIRMED => CONFIRMED] German Admin Should not able to CONFIRM order", async function () {
            const orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            await expect(taxRefund.connect(german_admin).rejectOrder(await buyer.getAddress(), orders[0].id)).to.be.revertedWith("Same country as the order created");
            await expect(taxRefund.connect(german_admin).rejectOrder(await buyer.getAddress(), orders[1].id)).to.be.revertedWith("Same country as the order created");
        });
    });
});