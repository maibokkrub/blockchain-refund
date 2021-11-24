import { TaxRefundStorage, CountryImmigration, Multicall } from "../typechain";
import { Signer } from "@ethersproject/abstract-signer";

export interface accounts {
    deployer: Signer;
    thAdmin: Signer;
    deAdmin: Signer;
    shop: Signer;
    buyer: Signer;
}

export interface contracts {
    taxRefund: TaxRefundStorage;
    thCountryImmigration: CountryImmigration;
    deCountryImmigration: CountryImmigration;
    multicall: Multicall;
}