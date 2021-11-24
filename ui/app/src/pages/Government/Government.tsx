import React, { useEffect, useState, useContext } from "react";
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
import { useContractCall, useContractFunction, useEthers } from "@usedapp/core";
import { useAdmin, useContractMethod, useOrder, useShop } from "../../utils/hooks";
import ApproveOrder from "./ApproveOrder";
import ConfirmOrder from "./ConfirmOrder";
import RejectOrder from "./RejectOrder";
import SearchBuyer from "./SearchBuyer";
import CreateShop from "./CreateShop";
import { _govTransformer } from "../../utils/getter";
import { DataContext } from "../../components/DataContext/DataContext";

function GovernmentPage() {
    const { account } = useEthers();
    const isAdmin = useAdmin(account);
    const data = useContext(DataContext);

    return (
        <Container maxW="1300px" h="calc(100vh - 64px - 3rem)" >
            { data.isAdmin ? 
                <>
                    <HStack w='full'>
                        <CreateShop />
                    </HStack>
                    <HStack w='full'> 
                        <ApproveOrder />
                        <RejectOrder />
                        <ConfirmOrder />
                    </HStack>
                    <SearchBuyer />
                </>
                : 
                <></>
            }
        </Container>
    );
}

export default GovernmentPage;
