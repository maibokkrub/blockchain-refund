import React, { useState } from "react";
import {
    Input,
    Button,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { useContractMethod } from "../../utils/hooks";

function ConfirmOrder() {
    const { state, send }   = useContractMethod("confirmOrder");
    
    const [buyerAddress, setBuyerAddress] = useState("");
    const [productId, setProductId] = useState("");

    
    const handleConfirmOrder = () => send(buyerAddress, productId)

    return (
        <VStack w='full' bg='whitesmoke' my='1' borderRadius='10px'>
            <Text
                fontSize="28px"
                as="b"
                paddingTop="27px"
                paddingBottom="9px"
                color="#1a202c"
            >
                Confirm Order
            </Text>
            <VStack spacing='3' >
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
                <Input
                    placeholder="Product Reference ID"
                    _placeholder={{ color: "#1a202c" }}
                    size="md"
                    variant="filled"
                    bg="#90cdf4"
                    color="#1a202c"
                    value={productId}
                    onChange={(e)=>setProductId(e.target.value)}
                />
            </VStack>
            <VStack p='2'>
                <Button onClick={handleConfirmOrder} bg="#1a202c">
                    Confirm Order
                </Button>
                <Text color='black'> 
                    TX Status: { state.status }
                </Text>
                <Text color='red'> 
                    { state.errorMessage } 
                </Text>
            </VStack>
        </VStack>
    );
}

export default ConfirmOrder;
