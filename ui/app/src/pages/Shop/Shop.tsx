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

import CreateOrder from "./CreateOrder";
import CancelOrder from "./CancelOrder";
import SearchShop from "./SearchShop";

function ShopPage() {
    
    return (
        <Container maxW="1300px" h="calc(100vh - 64px - 3rem)">
            <HStack w='full' align='baseline'> 
                <CreateOrder />
                <CancelOrder />
            </HStack>
            <HStack w='full'>
                <SearchShop />
            </HStack>
        </Container>
    );
}

export default ShopPage;
