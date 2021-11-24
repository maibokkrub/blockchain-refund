import { TransactionResponse } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { expect } from "chai";
import { init } from "../scripts/utils";
import { CountryImmigration, TaxRefundStorage } from "../typechain";
import { ethers, waffle } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
const { provider } = waffle;

describe("Normal Flow", function () {
    let taxRefund: TaxRefundStorage;
    let thCountryImmigration: CountryImmigration;
    let deCountryImmigration: CountryImmigration;
    let deployer: Signer;
    let thAdmin: Signer;
    let deAdmin: Signer;
    let shop: Signer;
    let buyer: Signer;
    let tx: TransactionResponse;
    before(async function () {
        const result = await init();
        //assign account
        deployer = result.deployer;
        thAdmin = result.thAdmin;
        deAdmin = result.deAdmin;
        shop = result.shop;
        buyer = result.buyer;

        //assign contract
        taxRefund = result.taxRefund;
        thCountryImmigration = result.thCountryImmigration;
        deCountryImmigration = result.deCountryImmigration;
    });
    describe("Confirm order", async function () {
        before(async function () {
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Louis Vuitton", ethers.utils.parseEther('100'), 4);
            await tx.wait();
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Adidas Crop Top", ethers.utils.parseEther('50'), 2);
            await tx.wait();
        });

        it("Refunded amount is 0", async function () {
            const refundAmount = await taxRefund.connect(thAdmin).getRefundAmount(await buyer.getAddress(), ["DE"]);
            expect(refundAmount).to.equal(ethers.utils.parseEther('0'));
        });

        it("[PENDING => PENDING] Thailand Admin Should not able to APPROVE order", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            await expect(taxRefund.connect(thAdmin).approveOrder(await buyer.getAddress(), orders[0].id)).to.be.revertedWith("Different country as the order created");
            await expect(taxRefund.connect(thAdmin).approveOrder(await buyer.getAddress(), orders[1].id)).to.be.revertedWith("Different country as the order created");
            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(0);
            expect(orders[1].state).to.equal(0);
        });

        it("[PENDING => APPROVED] German Admin Should able to APPROVE order", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            tx = await taxRefund.connect(deAdmin).approveOrder(await buyer.getAddress(), orders[0].id);
            await tx.wait();
            tx = await taxRefund.connect(deAdmin).approveOrder(await buyer.getAddress(), orders[1].id);
            await tx.wait();
            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(3);
            expect(orders[1].state).to.equal(3);
        });


        it("[APPROVED => APPROVED] German Admin Should not able to CONFIRM order", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            await expect(taxRefund.connect(deAdmin).confirmOrder(await buyer.getAddress(), orders[0].id)).to.be.revertedWith("Same country as the order created");
            await expect(taxRefund.connect(deAdmin).confirmOrder(await buyer.getAddress(), orders[1].id)).to.be.revertedWith("Same country as the order created");
            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(3);
            expect(orders[1].state).to.equal(3);
        });

        it("[APPROVED => CONFIRMED] Thailand Admin Should able to CONFIRM order", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            tx = await taxRefund.connect(thAdmin).confirmOrder(await buyer.getAddress(), orders[0].id);
            await tx.wait();
            tx = await taxRefund.connect(thAdmin).confirmOrder(await buyer.getAddress(), orders[1].id);
            await tx.wait();
            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(4);
            expect(orders[1].state).to.equal(4);
        });
    });

    describe("Refund Order", async function () {
        it("Refunded amount is 95 ethers", async function () {
            const refundAmount = await taxRefund.connect(buyer).getRefundAmount(await buyer.getAddress(), ["DE"]);
            expect(refundAmount).to.equal(ethers.utils.parseEther('95'));
        });
        
        it("[CONFIRMED => CONFIRMED] Admin should not be able to refund other's orders", async function () {
            await expect(taxRefund.connect(thAdmin).refund(["DE"])).to.be.revertedWith("Buyer don't have orders");

            const orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(4);
            expect(orders[1].state).to.equal(4);
        });

        it("[CONFIRMED => REFUNDED] Buyer should be able to refund only 1 time per order", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            await expect(await taxRefund.connect(buyer).refund(["DE"])).to.changeEtherBalance(buyer,ethers.utils.parseEther('95'));

            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(5);
            expect(orders[1].state).to.equal(5);

            await expect(taxRefund.connect(buyer).refund(["DE"])).to.be.revertedWith("No Refundable Order");
        });

    });

    describe("Cancel order & Reject order", async function () {
        before(async function () {
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Louis Vuitton", ethers.utils.parseEther('100'), 5);
            await tx.wait();
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Adidas Crop Top", ethers.utils.parseEther('50'), 2);
            await tx.wait();
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Nike Pants", ethers.utils.parseEther('50'), 2);
            await tx.wait();
        });

        it("Shop cancel order #3, German admin reject order #4, Thailand admin confirm order #5", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());

            tx = await taxRefund.connect(shop).cancelOrder(await buyer.getAddress(), orders[2].id);
            await tx.wait();
            tx = await taxRefund.connect(deAdmin).rejectOrder(await buyer.getAddress(), orders[3].id);
            await tx.wait();
            tx = await taxRefund.connect(deAdmin).approveOrder(await buyer.getAddress(), orders[4].id);
            await tx.wait();
            tx = await taxRefund.connect(thAdmin).confirmOrder(await buyer.getAddress(), orders[4].id);
            await tx.wait();

            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[2].state).to.equal(1);
            expect(orders[3].state).to.equal(2);
            expect(orders[4].state).to.equal(4);
        });

        it("Refunded amount should calculate only order #5 that is 19 ethers", async function () {
            const refundAmount = await taxRefund.connect(thAdmin).getRefundAmount(await buyer.getAddress(),["DE"]);
            expect(refundAmount).to.equal(ethers.utils.parseEther('19'));
        });

        it("[CONFIRMED => REFUNDED] Refunded only order #5", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[4].state).to.equal(4);
            await expect(await taxRefund.connect(buyer).refund(["DE"])).to.changeEtherBalance(buyer,ethers.utils.parseEther('19'));
            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[4].state).to.equal(5);
        });

        it("All Order's state is correct", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(5);
            expect(orders[1].state).to.equal(5);
            expect(orders[2].state).to.equal(1);
            expect(orders[3].state).to.equal(2);
            expect(orders[4].state).to.equal(5);
        });
    });

});