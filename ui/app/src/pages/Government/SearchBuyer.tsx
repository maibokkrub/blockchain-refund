import React, { useRef, useState } from "react";
import {
    Input,
    Button,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import Table from "../../components/Table/Table";
import { useOrder } from "../../utils/hooks";
import { _govTransformer } from "../../utils/getter";

const tableColumns = [
    { title: "TxID", field: "id", },
    { title: "Country", field: "country", },
    { title: "Name", field: "itemName", },
    { title: "Shop", field: "shopName", },
    { title: "Amount", field: "itemAmount", type: 'numeric', filtering: false, },
    { title: "Price", field: "itemPrice", type: 'numeric', filtering: false, },
    { title: "Total", field: "itemTotal", type: 'numeric', filtering: false, },
    { title: "Status", field: "status", type: 'numeric', },
];

function SearchBuyer() {

    const ref = useRef<HTMLInputElement>(null); 
    const [buyerAddress, setBuyerAddress] = useState("");

    const __orders = useOrder(buyerAddress === "" ? undefined : buyerAddress);
    const orders = __orders?.map((x:any)=>_govTransformer(x))

    const handleSearchBuyer = () => setBuyerAddress(ref.current?.value || '');

    return (
        <VStack w='full' bg='whitesmoke' my='1' borderRadius='10px' >
            <Text
                fontSize="28px"
                as="b"
                paddingTop="27px"
                paddingBottom="9px"
                color="#1a202c"
            >
                Search Buyer
            </Text>
            <HStack w='50%' bg='whitesmoke' my='1' borderRadius='10px' >
                <Input
                    ref={ref}
                    placeholder="Buyer Address"
                    _placeholder={{ color: "#1a202c" }}
                    size="md"
                    variant="filled"
                    bg="#90cdf4"
                    color="#1a202c"
                />
                <Button onClick={handleSearchBuyer} bg="#1a202c">
                    Search Buyer
                </Button>
            </HStack>
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

export default SearchBuyer;
