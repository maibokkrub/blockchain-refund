import { TransactionResponse } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { expect } from "chai";
import { init } from "../scripts/utils";
import { CountryImmigration, TaxRefundStorage } from "../typechain";
import { ethers, waffle } from "hardhat";
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
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            const refundAmount = await taxRefund.connect(thAdmin).getRefundAmount(orders.map(orders => orders.id), "DE");
            expect(refundAmount).to.equal(ethers.utils.parseEther('0'));
        });

        it("[PENDING => PENDING] German Admin Should not able to CONFIRM order", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            await expect(taxRefund.connect(deAdmin).confirmOrder(await buyer.getAddress(), orders[0].id)).to.be.revertedWith("Same country as the order created");
            await expect(taxRefund.connect(deAdmin).confirmOrder(await buyer.getAddress(), orders[1].id)).to.be.revertedWith("Same country as the order created");

            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(0);
            expect(orders[1].state).to.equal(0);
        });

        it("[PENDING => CONFIRMED] Thailand Admin Should able to CONFIRM order", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            tx = await taxRefund.connect(thAdmin).confirmOrder(await buyer.getAddress(), orders[0].id);
            await tx.wait();
            tx = await taxRefund.connect(thAdmin).confirmOrder(await buyer.getAddress(), orders[1].id);
            await tx.wait();
            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(2);
            expect(orders[1].state).to.equal(2);
        });
    });

    describe("Refund Order", async function () {
        it("Refunded amount is 95 ethers", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            const refundAmount = await taxRefund.connect(thAdmin).getRefundAmount(orders.map(orders => orders.id), "DE");
            expect(refundAmount).to.equal(ethers.utils.parseEther('95'));
        });

        it("[CONFIRMED => CONFIRMED] German Admin Should not able to REFUND order", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            const orderIds = orders.map(order => order.id);
            await expect(taxRefund.connect(deAdmin).refund(orderIds, "DE", await buyer.getAddress())).to.be.revertedWith("Same country as the order created");

            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(2);
            expect(orders[1].state).to.equal(2);
        });

        it("[CONFIRMED => REFUNDED] Thailand Admin Should able to REFUND order", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            const orderIds = orders.map(order => order.id);
            tx = await taxRefund.connect(thAdmin).refund(orderIds, "DE", await buyer.getAddress());
            await tx.wait();
            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(4);
            expect(orders[1].state).to.equal(4);
            expect(await provider.getBalance(await buyer.getAddress())).to.equal(ethers.utils.parseEther('10095'));
        });
    });

    describe("Shop cancel order #3", async function () {
        before(async function () {
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Louis Vuitton", ethers.utils.parseEther('100'), 5);
            await tx.wait();
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Adidas Crop Top", ethers.utils.parseEther('50'), 2);
            await tx.wait();
            tx = await taxRefund.connect(shop).createOrder(await buyer.getAddress(), "Nike Pants", ethers.utils.parseEther('50'), 2);
            await tx.wait();
        });

        it("[PENDING => CANCELED] Shop should able to CANCELED order, Thailand admin confirm order #4", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());

            tx = await taxRefund.connect(shop).cancelOrder(await buyer.getAddress(), orders[2].id);
            await tx.wait();
            tx = await taxRefund.connect(thAdmin).confirmOrder(await buyer.getAddress(), orders[3].id);
            await tx.wait();
            tx = await taxRefund.connect(thAdmin).confirmOrder(await buyer.getAddress(), orders[4].id);
            await tx.wait();

            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[2].state).to.equal(1);
            expect(orders[3].state).to.equal(2);
            expect(orders[4].state).to.equal(2);
        });

        it("Refunded amount should calculate only order #4 and #5 that is 38 ethers", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            const refundAmount = await taxRefund.connect(thAdmin).getRefundAmount(orders.map(orders => orders.id), "DE");
            expect(refundAmount).to.equal(ethers.utils.parseEther('38'));
        });

        it("[CONFIRMED => REJECTED] Thailand admin should be able to REJECT order, But German Admin can't", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            await expect(taxRefund.connect(deAdmin).rejectOrder(await buyer.getAddress(), orders[3].id)).to.be.revertedWith('Same country as the order created');

            tx = await taxRefund.connect(thAdmin).rejectOrder(await buyer.getAddress(), orders[3].id);
            await tx.wait();
            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[3].state).to.equal(3);
            expect(orders[4].state).to.equal(2);
        });

        it("Refunded amount should calculate only order #5 that is 19 ethers", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            const refundAmount = await taxRefund.connect(thAdmin).getRefundAmount(orders.map(orders => orders.id), "DE");
            expect(refundAmount).to.equal(ethers.utils.parseEther('19'));
        });

        it("[CONFIRMED => REFUNDED] Refunded only order #5", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            const orderIds = orders.map(order => order.id);
            tx = await taxRefund.connect(thAdmin).refund(orderIds, "DE", await buyer.getAddress());
            await tx.wait();
            orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[4].state).to.equal(4);
            expect(await provider.getBalance(await buyer.getAddress())).to.equal(ethers.utils.parseEther('10114'));
        });

        it("All Order's state is correct", async function () {
            let orders = await taxRefund.getAllOrdersByBuyer(await buyer.getAddress());
            expect(orders[0].state).to.equal(4);
            expect(orders[1].state).to.equal(4);
            expect(orders[2].state).to.equal(1);
            expect(orders[3].state).to.equal(3);
            expect(orders[4].state).to.equal(4);
        });
    });

});