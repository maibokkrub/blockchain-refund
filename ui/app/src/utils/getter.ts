import { BigNumber } from '@ethersproject/bignumber';
import { utils } from 'ethers';
// id: "0x4a1512f578cce3a45704783dc21128c0"
// name: "222"
// amount: Object { _hex: "0x16", _isBigNumber: true }
// price: Object { _hex: "0x014d", _isBigNumber: true }
// ​​shop: 
//     country: "TH"
// ​​​    exists: true
// ​​​    length: 4
//     shopAddr: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
// ​​​    shopName: "kuay"
// state: 0

export const STATES = [
    'PENDING', 
    'CANCELLED' ,
    'APPROVED'  , 
    'CONFIRMED' ,
    'REJECTED'  ,
    'REFUNDED'  ,
]

// OUTPUT country, itemName, amount, price, total, status
export const _orderTransformer = (order:Order):OrderView => {
    return { 
        country:  order.shop.country,
        itemName: order.name,
        shopName: order.shop.shopName,
        status:   STATES[order.state],
        itemAmount: order.amount.toNumber(),
        itemPrice:  parseFloat(utils.formatEther(order.price)),
        itemTotal:  parseFloat(utils.formatEther(order.amount.mul(order.price))),
    }
}
export const _govTransformer = (order:any) => { 
    return { 
        id: order.id,
        country:  order.shop.country,
        buyer: order.buyer,
        itemName: order.name,
        shopName: order.shop.shopName,
        buyerName: order.buyerName,
        status:   STATES[order.state],
        itemAmount: order.amount.toNumber(),
        itemPrice:  parseFloat(utils.formatEther(order.price)),
        itemTotal:  parseFloat(utils.formatEther(order.amount.mul(order.price))),
    }
}

export const OrderState = [
    "PENDING",
    "CANCELLED",
    "REJECTED",
    "APPROVED",
    "CONFIRMED",
    "REFUNDED"
]


export interface OrderView{ 
    country: string; 
    itemName: string; 
    shopName: string;
    status: string; 
    // To be changed to big number
    itemAmount: number; 
    itemPrice: number;
    itemTotal: number; 
}

export interface Order { 
    id: string; 
    name: string; 
    buyerName: string; 
    amount: BigNumber;
    price: BigNumber;
    shop: Shop; 
    state: number;
    1?:any; 2?:any; 3?:any; 4?:any; 5?:any; 6?:any; 7?:any; 8?:any; 
}

export interface Shop { 
    country: string; 
    exists: boolean; 
    length: number; 
    shopAddr: string; 
    shopName: string;
    1?:any; 2?:any; 3?:any; 4?:any; 5?:any; 6?:any; 7?:any; 8?:any; 
}