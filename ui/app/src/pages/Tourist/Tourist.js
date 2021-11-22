import React, { useState } from 'react';
import { Container, Flex, Spacer, Box, Center, Text, Image, Button } from "@chakra-ui/react";
import OrderTable from '../../components/OrderTable/OrderTable';
import QRCode from '../../assets/sample-qr.jpg';

function TouristPage() {
  const [refundAmount, setRefundAmount] = useState(0.25);

  const testOrderData = [
    { country: "THA", shop_name: "Ari Shop", total: 24.23, vat: 1.70 },
    { country: "THA", shop_name: "Garrett", total: 49.10, vat: 3.44 },
    { country: "THA", shop_name: "KFC", total: 18.43, vat: 1.29 },
    { country: "USA", shop_name: "Walmart", total: 25.15, vat: 1.76 },
    { country: "USA", shop_name: "Amazon", total: 19.09, vat: 1.34 },
    { country: "USA", shop_name: "Apple", total: 12.43, vat: 0.87 },
  ];

  const testOrderColumns = [
    { title: "Country", field: "country", },
    { title: "Shop", field: "shop_name", },
    { title: "Total", field: "total", type: 'numeric', },
    { title: "VAT", field: "vat", type: 'numeric', },
  ];

  return (
    <Container maxW="1300px" h='calc(100vh - 64px - 3rem)'>
        <Flex>
          <Box w="480px" p="4">
            <OrderTable
              title="Non-Refundable Order"
              data={testOrderData}
              columns={testOrderColumns}
            />
          </Box>
          <Spacer />
          <Box w="480px" p="4">
            <OrderTable
              title="Refundable Order"
              data={testOrderData}
              columns={testOrderColumns}
            />
            <br />
            <Center>
              <Spacer />
              <Box bg="salmon" p="4" borderRadius="10px" >
                <Text fontSize="16px" align="center">Total Refundable Amount</Text>
                <Text fontSize="26px" as="b" align="center">{refundAmount} ETH</Text>
              </Box>
              <Spacer />
              <Button colorScheme="blue">Request Refund</Button>
              <Spacer />
            </Center>
          </Box>
          <Spacer />
          <Box w="280px">
            <Center>
              <Text fontSize="24px" as="b" paddingTop="27px" paddingBottom="18px">Your QR Code</Text>
            </Center>
            <Center>
              <Image boxSize="220px" borderRadius="5%" src={QRCode} alt="qrcode" />
            </Center>
          </Box>
        </Flex>
    </Container> 
  );
}

export default TouristPage;
