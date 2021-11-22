import React, { useState } from 'react';
import { Container, Flex, Spacer, Box, Stack, Input, Button, Center, Text } from "@chakra-ui/react";
import Table from '../../components/Table/Table';

function GovernmentPage() {
  const [buyerAddress, setBuyerAddress] = useState('');
  const [billNo, setBillNo] = useState('');
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [refundAmount, setRefundAmount] = useState(0.25);

  const testOrderData = [
    { user_address: "0x3cds...78a592b4c", shop_name: "Ari Shop", total: 24.23, vat: 1.70, status: 'COMPLETED' },
    { user_address: "0x3cds...78a592b4c", shop_name: "Garrett", total: 49.10, vat: 3.44, status: 'REFUNDED' },
    { user_address: "0x3cds...78a592b4c", shop_name: "KFC", total: 18.43, vat: 1.29, status: 'REFUNDED' },
  ];

  const testOrderColumns = [
    { title: "User Address", field: "user_address", },
    { title: "Shop", field: "shop_name", },
    { title: "Total", field: "total", type: 'numeric', },
    { title: "VAT", field: "vat", type: 'numeric', },
    { title: "Status", field: "status", type: 'numeric', },
  ];

  return (
    <Container maxW="1300px" h='calc(100vh - 64px - 3rem)'>
            <Flex>
                <Spacer />
                <Box w="480px" p="4" bg="white" paddingBottom="45px" borderRadius="10px">
                  <Center>
                    <Text fontSize="28px" as="b" paddingTop="27px" paddingBottom="18px" color="#1a202c">Confirm Order</Text>
                  </Center>
                  <Stack spacing={3}>
                    <Input placeholder="Buyer Address" _placeholder={{ color: "#1a202c" }} size="md" variant="filled" bg="#90cdf4" color="#1a202c" value={buyerAddress} />
                    <Input placeholder="Bill Number" _placeholder={{ color: "#1a202c" }} size="md" variant="filled" bg="#90cdf4" color="#1a202c" value={billNo} />
                    <Input placeholder="Product Reference ID" _placeholder={{ color: "#1a202c" }} size="md" variant="filled" bg="#90cdf4" color="#1a202c" value={productId} />
                    <Input placeholder="Price" _placeholder={{ color: "#1a202c" }} size="md" variant="filled" bg="#90cdf4" color="#1a202c" value={price} />
                  </Stack>
                  <br />
                  <Center>
                    <Button bg="#1a202c">Confirm Order</Button>
                  </Center>
                </Box>
                <Spacer />
                <Box w="660px" p="4">
                  <Table
                    title="Order"
                    data={testOrderData}
                    columns={testOrderColumns}
                  />
                  <br />
                  <Center>
                    <Box bg="salmon" p="4" borderRadius="10px" >
                      <Text fontSize="16px" align="center">Pending to Refund Amount</Text>
                      <Text fontSize="28px" as="b" align="center">{refundAmount} ETH</Text>
                    </Box>
                  </Center>
                </Box>
            </Flex>
        </Container>
  );
}

export default GovernmentPage;
