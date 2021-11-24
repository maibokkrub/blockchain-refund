import React, { useEffect, useState, useContext } from "react";
import {
    Container,
    HStack,
} from "@chakra-ui/react";

import CreateOrder from "./CreateOrder";
import CancelOrder from "./CancelOrder";
import SearchShop from "./SearchShop";
import { DataContext } from "../../components/DataContext/DataContext";

function ShopPage() {
    const data = useContext(DataContext);
    
    return (
        <Container maxW="1300px" h="calc(100vh - 64px - 3rem)">
            { data.isShop ? 
                <>
                    <HStack w='full' align='baseline'> 
                        <CreateOrder />
                        <CancelOrder />
                    </HStack>
                    <HStack w='full'>
                        <SearchShop />
                    </HStack>
                </>
                :
                <></>
            }
        </Container>
    );
}

export default ShopPage;
