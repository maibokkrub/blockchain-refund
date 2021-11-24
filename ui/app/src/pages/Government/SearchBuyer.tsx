import React, { useState } from "react";
import {
    Input,
    Button,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { useContractMethod } from "../../utils/hooks";

function SearchBuyer() {
    // const { state, send }   = useContractMethod("rejectOrder");
    
    const [buyerAddress, setBuyerAddress] = useState("");
    const [productId, setProductId] = useState("");

    const handleSearchBuyer = () => {};

    return (
        <VStack w='full' bg='whitesmoke' my='1' borderRadius='10px'>
            <Text
                fontSize="28px"
                as="b"
                paddingTop="27px"
                paddingBottom="9px"
                color="#1a202c"
            >
                Search Buyer
            </Text>
            <HStack w='50%' bg='whitesmoke' my='1' borderRadius='10px' paddingBottom="27px">
                <Input
                    placeholder="Buyer Address"
                    _placeholder={{ color: "#1a202c" }}
                    size="md"
                    variant="filled"
                    bg="#90cdf4"
                    color="#1a202c"
                    value={buyerAddress}
                    onChange={(e)=>setBuyerAddress(e.target.value)}
                />
                <Button onClick={handleSearchBuyer} bg="#1a202c">
                    Search Buyer
                </Button>
            </HStack>
        </VStack>
    );
}

export default SearchBuyer;
