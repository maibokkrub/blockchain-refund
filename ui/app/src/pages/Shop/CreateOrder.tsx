import React, { useState } from "react";
import {
    Input,
    Button,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { useContractMethod } from "../../utils/hooks";
import { utils } from 'ethers'

function CreateOrder() {
    const { state ,send}   = useContractMethod("createOrder");

    const [buyerAddress, setBuyerAddress] = useState("");
    const [productId, setProductId]       = useState("");
    const [itemPrice, setItemPrice]       = useState("");
    const [itemAmount, setItemAmount]     = useState("");
    
    const handleCreateOrder= () => send(buyerAddress, productId, utils.parseEther(itemPrice), itemAmount)

    return (
        <VStack w='full' bg='whitesmoke' my='1' borderRadius='10px' h='25rem'>
            <Text
                fontSize="28px"
                as="b"
                paddingTop="27px"
                paddingBottom="9px"
                color="#1a202c"
            >
                Create Order
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
                            placeholder="Product Name"
                            _placeholder={{ color: "#1a202c" }}
                            size="md"
                            variant="filled"
                            bg="#90cdf4"
                            color="#1a202c"
                            value={productId}
                            onChange={(e)=>setProductId(e.target.value)}
                        />
                        <Input
                            placeholder="Price (Ether)"
                            _placeholder={{ color: "#1a202c" }}
                            size="md"
                            variant="filled"
                            bg="#90cdf4"
                            color="#1a202c"
                            value={itemPrice}
                            onChange={(e)=>setItemPrice(e.target.value)}
                        />
                        <Input
                            placeholder="Amount"
                            _placeholder={{ color: "#1a202c" }}
                            size="md"
                            variant="filled"
                            bg="#90cdf4"
                            color="#1a202c"
                            value={itemAmount}
                            onChange={(e)=>setItemAmount(e.target.value)}
                        />
            </VStack>
            <VStack p='2'>
                <Button onClick={handleCreateOrder} bg="#1a202c">
                    Create Order
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

export default CreateOrder;
