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
} from "@chakra-ui/react";
import { useContractMethod } from "../../utils/hooks";
import { useEthers } from "@usedapp/core";

function ShopPage() {
    const { state: createShopState, send: createShop }   = useContractMethod("createShop");
    const { state: createOrderState,send: createOrder}   = useContractMethod("createOrder");

    const [country, setCountry]         = useState("");
    const [shopName, setShopName]       = useState("");
    const [shopAddress, setShopAddress] = useState("");

    const [buyerAddress, setBuyerAddress] = useState("");
    const [productId, setProductId]       = useState("");
    const [itemPrice, setItemPrice]       = useState("");
    const [itemAmount, setItemAmount]     = useState("");
    
    const handleCreateShop = () => createShop(shopAddress, shopName, country)
    const handleCreateOrder= () => createOrder(buyerAddress, productId, itemPrice, itemAmount)
    
    return (
        <Container maxW="1300px" h="calc(100vh - 64px - 3rem)">
            <Flex>
                <Spacer />
                <Box
                    w="480px"
                    p="4"
                    bg="white"
                    paddingBottom="45px"
                    borderRadius="10px"
                >
                    <Center>
                        <Text
                            fontSize="28px"
                            as="b"
                            paddingTop="27px"
                            paddingBottom="18px"
                            color="#1a202c"
                        >
                            Create Shop
                        </Text>
                    </Center>
                    <Stack spacing={3}>
                        <Input
                            onChange={(e) => setShopAddress(e.target.value)}
                            placeholder="Shop Address"
                            _placeholder={{ color: "#1a202c" }}
                            size="md"
                            variant="filled"
                            bg="#90cdf4"
                            color="#1a202c"
                            value={shopAddress}
                        />
                        <Input
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                            _placeholder={{ color: "#1a202c" }}
                            size="md"
                            variant="filled"
                            bg="#90cdf4"
                            color="#1a202c"
                            value={country}
                        />
                        <Input
                            onChange={(e) => setShopName(e.target.value)}
                            placeholder="Shop Name"
                            _placeholder={{ color: "#1a202c" }}
                            size="md"
                            variant="filled"
                            bg="#90cdf4"
                            color="#1a202c"
                            value={shopName}
                        />
                    </Stack>
                    <br />
                    <VStack>
                        <Button onClick={handleCreateShop} bg="#1a202c">
                            Create Shop
                        </Button>
                        <Text color='black'> 
                            { createShopState.status }
                        </Text>
                        <Text color='red'> 
                            { createShopState.errorMessage } 
                        </Text>
                    </VStack>
                </Box>
                <Spacer />
                <Box
                    w="480px"
                    p="4"
                    bg="white"
                    paddingBottom="45px"
                    borderRadius="10px"
                >
                    <Center>
                        <Text
                            fontSize="28px"
                            as="b"
                            paddingTop="27px"
                            paddingBottom="18px"
                            color="#1a202c"
                        >
                            Create Order
                        </Text>
                    </Center>
                    <Stack spacing={3}>
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
                        <Input
                            placeholder="Price"
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
                    </Stack>
                    <br />
                    <VStack>
                        <Button onClick={handleCreateOrder} bg="#1a202c">
                            Create Order
                        </Button>
                        <Text color='black'> 
                            { createOrderState.status }
                        </Text>
                        <Text color='red'> 
                            { createOrderState.errorMessage } 
                        </Text>
                    </VStack>
                </Box>
                <Spacer />
            </Flex>
        </Container>
    );
}

export default ShopPage;
