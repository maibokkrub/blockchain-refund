import React, { useRef, useState } from "react";
import {
    Input,
    Button,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import Table from "../../components/Table/Table";
import { useOrder, useOrderByShop } from "../../utils/hooks";
import { _govTransformer } from "../../utils/getter";

const tableColumns = [
    { title: "TxID", field: "id", },
    { title: "Buyer", field: "buyer",},
    { title: "Name", field: "itemName", },
    { title: "Country", field: "country", },
    { title: "Amount", field: "itemAmount", type: 'numeric', },
    { title: "Price", field: "itemPrice", type: 'numeric', },
    { title: "Total", field: "itemTotal", type: 'numeric', },
    { title: "Status", field: "status", type: 'numeric', },
];

function SearchShop() {

    const __orders = useOrderByShop(); 
    const orders = __orders?.map((x:any)=>_govTransformer(x))

    return (
        <VStack w='full' bg='whitesmoke' my='1' borderRadius='10px'>
            <HStack w='full'> 
                <Table
                    title="Order"
                    data={orders}
                    columns={tableColumns}
                /> 
            </HStack>
        </VStack>
    );
}

export default SearchShop;
