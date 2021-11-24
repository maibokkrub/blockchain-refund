import CountryImmigrationABI from "../artifacts/contracts/CountryImmigration.sol/CountryImmigration.json";
import TaxRefundStorageABI from "../artifacts/contracts/TaxRefundStorage.sol/TaxRefundStorage.json";
import MultiCallABI from "../artifacts/contracts/Multicall.sol/Multicall.json";
import { ethers, waffle } from "hardhat";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { accounts, contracts } from "./interface";
import { CountryImmigration, TaxRefundStorage, Multicall } from "../typechain";

const { deployContract, provider } = waffle;
export const getAccount = async (): Promise<accounts> => {
    //get accounts
    const [deployer, thAdmin, deAdmin, shop, buyer] = await ethers.getSigners();
    const accounts: accounts = { deployer, thAdmin, deAdmin, shop, buyer };
    return accounts;
};

export const getContracts = async (): Promise<contracts> => {
    const deployer = (await ethers.getSigners())[0];
    const taxRefund = (await deployContract(deployer, TaxRefundStorageABI)) as TaxRefundStorage;
    await taxRefund.deployed();

    const thCountryImmigration = (await deployContract(deployer, CountryImmigrationABI, ['TH', 700, taxRefund.address])) as CountryImmigration;
    const deCountryImmigration = (await deployContract(deployer, CountryImmigrationABI, ['DE', 1900, taxRefund.address])) as CountryImmigration;
    await thCountryImmigration.deployed();
    await deCountryImmigration.deployed();

    const multicall = (await deployContract(deployer, MultiCallABI)) as Multicall;
    await multicall.deployed();
    return { taxRefund, thCountryImmigration, deCountryImmigration, multicall } as contracts;
};

export const setRefundAddress = async (taxRefund: TaxRefundStorage, thCountryImmigration: CountryImmigration, deCountryImmigration: CountryImmigration) => {
    let tx;
    tx = await taxRefund.setRefundAddress('TH', thCountryImmigration.address);
    await tx.wait();
    tx = await taxRefund.setRefundAddress('DE', deCountryImmigration.address);
    await tx.wait();
};

export const createAdmin = async (taxRefund: TaxRefundStorage, thAdmin: Signer, deAdmin: Signer) => {
    let tx;
    tx = await taxRefund.createAdmin(await thAdmin.getAddress(), 'TH');
    await tx.wait();
    tx = await taxRefund.createAdmin(await deAdmin.getAddress(), 'DE');
    await tx.wait();
};

export const createShop = async (taxRefund: TaxRefundStorage, shop: Signer, name: string, countryCode: string) => {
    let tx;
    tx = await taxRefund.createShop(await shop.getAddress(), name, countryCode);
    await tx.wait();
};

export const init = async () => {
    const { deployer, thAdmin, deAdmin, shop, buyer } = await getAccount();
    const shopTH = (await ethers.getSigners())[5];
    const { taxRefund, thCountryImmigration, deCountryImmigration, multicall } = await getContracts();
    await setRefundAddress(taxRefund, thCountryImmigration, deCountryImmigration);
    await createAdmin(taxRefund, thAdmin, deAdmin);
    await createShop(taxRefund,shop,"Grand Mall","DE");
    await createShop(taxRefund,shopTH,"Central World","TH");

    let tx = await deployer.sendTransaction({
        to: thCountryImmigration.address,
        value: ethers.utils.parseEther('4500')
    });
    await tx.wait();

    tx = await deployer.sendTransaction({
        to: deCountryImmigration.address,
        value: ethers.utils.parseEther('4500')
    });
    await tx.wait();
    return { deployer, thAdmin, deAdmin, shop, buyer,shopTH, taxRefund, thCountryImmigration, deCountryImmigration, multicall };
};