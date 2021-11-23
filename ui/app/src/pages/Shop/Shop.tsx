import React, { useState } from 'react';
import { Container, Flex, Spacer, Box, Stack, Input, Button, Center, Text } from "@chakra-ui/react";

function ShopPage() {
    const [country, setCountry] = useState('');
    const [shopName, setShopName] = useState('');
    const [buyerAddress, setBuyerAddress] = useState('');
    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState('');

    return (
        <Container maxW="1300px" h='calc(100vh - 64px - 3rem)'>
            <Flex>
                <Spacer />
                <Box w="480px" p="4" bg="white" paddingBottom="45px" borderRadius="10px">
                    <Center>
                        <Text fontSize="28px" as="b" paddingTop="27px" paddingBottom="18px" color="#1a202c">Create Shop</Text>
                    </Center>
                    <Stack spacing={3}>
                        <Input placeholder="Country" _placeholder={{ color: "#1a202c" }} size="md" variant="filled" bg="#90cdf4" color="#1a202c" value={country} />
                        <Input placeholder="Shop Name" _placeholder={{ color: "#1a202c" }} size="md" variant="filled" bg="#90cdf4" color="#1a202c" value={shopName} />
                    </Stack>
                    <br />
                    <Center>
                        <Button bg="#1a202c">Create Shop</Button>
                    </Center>
                </Box>
                <Spacer />
                <Box w="480px" p="4" bg="white" paddingBottom="45px" borderRadius="10px">
                    <Center>
                        <Text fontSize="28px" as="b" paddingTop="27px" paddingBottom="18px" color="#1a202c">Create Order</Text>
                    </Center>
                    <Stack spacing={3}>
                        <Input placeholder="Buyer Address" _placeholder={{ color: "#1a202c" }} size="md" variant="filled" bg="#90cdf4" color="#1a202c" value={buyerAddress} />
                        <Input placeholder="Product Reference ID" _placeholder={{ color: "#1a202c" }} size="md" variant="filled" bg="#90cdf4" color="#1a202c" value={productId} />
                        <Input placeholder="Price" _placeholder={{ color: "#1a202c" }} size="md" variant="filled" bg="#90cdf4" color="#1a202c" value={price} />
                    </Stack>
                    <br />
                    <Center>
                        <Button bg="#1a202c">Create Order</Button>
                    </Center>
                </Box>
                <Spacer />
            </Flex>
        </Container>
    );
}

export default ShopPage;
