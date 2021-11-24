import { BigNumber } from '@ethersproject/bignumber';
import { useContractCall, useContractFunction } from "@usedapp/core";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { MainContractInterface, MainContract } from "./contract";
import { MAIN_CONTRACT_ADDRESS } from '../config';

export function useAdmin(address: string | Falsy): boolean | undefined {
  const [isAdmin] =
    useContractCall(
      address && {
        abi: MainContractInterface,
        address: MAIN_CONTRACT_ADDRESS,
        method: 'isAdmin',
        args: [address],
      }
    ) ?? [];
  return isAdmin;
}

export function useShop(address: string | Falsy): boolean | undefined {
  const [isShop] =
    useContractCall(
      address && {
        abi: MainContractInterface,
        address: MAIN_CONTRACT_ADDRESS,
        method: 'isShop',
        args: [address],
      }
    ) ?? [];
  return isShop;
}

export function useOrder(address: string | Falsy) {
  const orderList = useContractCall(
    address && {
      abi: MainContractInterface,
      address: MAIN_CONTRACT_ADDRESS,
      method: 'getAllOrdersByBuyer',
      args: [address],
    }
  ) ?? [];
  return orderList;
}

export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(MainContract, methodName, {});
  return { state, send };
}
