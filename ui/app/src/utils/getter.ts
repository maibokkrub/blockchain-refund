import { BigNumber } from '@ethersproject/bignumber';
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

// OUTPUT country, itemName, amount, price, total, status
export const _orderTransformer = (order:Order):OrderView => { 
    return { 
        country: order.shop.country,
        itemName: order.name,
        shopName: order.shop.shopName,
        status: order.state,
        itemAmount: order.amount.toNumber(),
        itemPrice: order.price.toNumber(),
        itemTotal: order.amount.mul(order.price).toNumber(),
    }
}

export enum OrderState { 
    PENDING   =0,
    CANCELLED =1,
    APPROVED  =2, 
    CONFIRMED =3,
    REJECTED  =4,
    REFUNDED  =5,
}

export interface OrderView{ 
    country: string; 
    itemName: string; 
    shopName: string;
    status: OrderState; 
    // To be changed to big number
    itemAmount: number; 
    itemPrice: number;
    itemTotal: number; 
}

export interface Order { 
    id: string; 
    name: string; 
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