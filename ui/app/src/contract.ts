import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'

import MainContractABI from './abi/main_contract.abi.json'
import { MAIN_CONTRACT_ADDRESS } from './config'
import { TaxRefundStorage } from "./TaxRefundStorage";

const MainContractInterface = new utils.Interface(MainContractABI.abi)

export const MainContract =(new Contract(MAIN_CONTRACT_ADDRESS, MainContractInterface)) as TaxRefundStorage;