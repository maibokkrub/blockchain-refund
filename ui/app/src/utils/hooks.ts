import React, { useState, useEffect, useContext } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useContractCall, useContractFunction, useEthers } from "@usedapp/core";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { MainContractInterface, MainContract } from "./contract";
import { MAIN_CONTRACT_ADDRESS } from '../config';
import { _orderTransformer, Order, OrderState } from './getter';
import { DataContext } from "../components/DataContext/DataContext";

export function useAdmin(address: string | Falsy): boolean | undefined {
  const data = useContext(DataContext);
  const [isAdmin] =
    useContractCall(
      address && {
        abi: MainContractInterface,
        address: MAIN_CONTRACT_ADDRESS,
        method: 'isAdmin',
        args: [address],
      }
    ) ?? [];
  if (isAdmin !== undefined) {
    data.setIsAdmin(isAdmin);
  } else {
    data.setIsAdmin(false);
  }
  return isAdmin;
}

export function useShop(address: string | Falsy): boolean | undefined {
  const data = useContext(DataContext);
  const [isShop] =
    useContractCall(
      address && {
        abi: MainContractInterface,
        address: MAIN_CONTRACT_ADDRESS,
        method: 'isShop',
        args: [address],
      }
    ) ?? [];
    if (isShop !== undefined) {
      data.setIsShop(isShop);
    } else {
      data.setIsShop(false);
    }
  return isShop;
}

export function useOrder(address?: string | Falsy) {
  const {account} = useEthers(); 
  address = address || account;
  const orderList = useContractCall(
    address && {
      abi: MainContractInterface,
      address: MAIN_CONTRACT_ADDRESS,
      method: 'getAllOrdersByBuyer',
      args: [address],
    }
  ) ?? [];
  return orderList[0];
}

export function useRefundAmount(address: string| Falsy, orderIds:string[] | Falsy,country:string | Falsy){
  const refundAmount = useContractCall(
    address && {
      abi: MainContractInterface,
      address: MAIN_CONTRACT_ADDRESS,
      method: 'getRefundAmount',
      args: [address, orderIds, country],
    }
  ) ?? 0;

  return refundAmount;
}

export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(MainContract, methodName, {});
  return { state, send };
}
