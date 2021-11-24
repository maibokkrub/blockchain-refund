import React, { useEffect, useState } from "react";
import {
    Container,
    Flex,
    Spacer,
    Box,
    Stack,
    Input,
    Button,
    Center,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import Table from "../../components/Table/Table";
import { useContractCall, useContractFunction, useEthers } from "@usedapp/core";
import { useAdmin, useContractMethod, useShop } from "../../utils/hooks";
import ApproveOrder from "./ApproveOrder";
import ConfirmOrder from "./ConfirmOrder";
const testOrderData = [
    {
        user_address: "0x3cds...78a592b4c",
        shop_name: "Ari Shop",
        total: 24.23,
        vat: 1.7,
        status: "COMPLETED",
    },
    {
        user_address: "0x3cds...78a592b4c",
        shop_name: "Garrett",
        total: 49.1,
        vat: 3.44,
        status: "REFUNDED",
    },
    {
        user_address: "0x3cds...78a592b4c",
        shop_name: "KFC",
        total: 18.43,
        vat: 1.29,
        status: "REFUNDED",
    },
];

const testOrderColumns = [
    { title: "User Address", field: "user_address" },
    { title: "Shop", field: "shop_name" },
    { title: "Total", field: "total", type: "numeric" },
    { title: "VAT", field: "vat", type: "numeric" },
    { title: "Status", field: "status", type: "numeric" },
];

function GovernmentPage() {
    const { account } = useEthers();
    const isAdmin = useAdmin(account);

    const { state: approveOrderState, send: approveOrder }   = useContractMethod("confirmOrder");
    
    const [buyerAddress, setBuyerAddress] = useState("");
    const [productId, setProductId] = useState("");
    // const [billNo, setBillNo] = useState("");
    // const [price, setPrice] = useState("");
    const [pendingAmount, setPendingAmount] = useState(0.25);
    const [refundedAmount, setRefundedAmount] = useState(0.25);
    

    const handleApproveOrder = () => approveOrder (buyerAddress, productId)
    
    console.log(isAdmin);

    return (
        <Container maxW="1300px" h="calc(100vh - 64px - 3rem)" >
            <HStack w='full'> 
                <ApproveOrder />
                <ConfirmOrder />
            </HStack>

            <HStack w='full'> 
                <Box w="660px" p="4">
                    {/* <Table
                        title="Order"
                        data={testOrderData}
                        columns={testOrderColumns}
                    /> */}
                    <br />
                    {/* <Center>
                        <Spacer />
                        <Spacer />
                        <Box bg="salmon" p="4" borderRadius="10px">
                            <Text fontSize="16px" align="center">
                                Pending to Refund Amount
                            </Text>
                            <Text fontSize="28px" as="b" align="center">
                                {pendingAmount} ETH
                            </Text>
                        </Box>
                        <Spacer />
                        <Box bg="#4EC33D" p="4" borderRadius="10px">
                            <Text fontSize="16px" align="center">
                                Refunded Amount
                            </Text>
                            <Text fontSize="28px" as="b" align="center">
                                {refundedAmount} ETH
                            </Text>
                        </Box>
                        <Spacer />
                        <Spacer />
                    </Center> */}
                </Box>
            </HStack>
        </Container>
    );
}

export default GovernmentPage;
