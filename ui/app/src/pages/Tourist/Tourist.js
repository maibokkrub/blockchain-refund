import React, { useState } from 'react';
import { Container, Flex, Spacer, Box, Center, Text, Image, Button } from "@chakra-ui/react";
import Table from '../../components/Table/Table';
import QRCode from '../../assets/sample-qr.jpg';

function TouristPage() {
  const [refundableAmount, setRefundableAmount] = useState(0.25);

  const testAllOrderData = [
    { country: "THA", shop_name: "Ari Shop", total: 24.23, vat: 1.70, status: 'COMPLETED' },
    { country: "THA", shop_name: "Garrett", total: 49.10, vat: 3.44, status: 'REFUNDED' },
    { country: "THA", shop_name: "KFC", total: 18.43, vat: 1.29, status: 'REFUNDED' },
    { country: "USA", shop_name: "Walmart", total: 25.15, vat: 1.76, status: 'CONFIRMED' },
    { country: "USA", shop_name: "Amazon", total: 19.09, vat: 1.34, status: 'CONFIRMED' },
    { country: "USA", shop_name: "Apple", total: 12.43, vat: 0.87, status: 'CONFIRMED' },
  ];

  const testAllOrderColumns = [
    { title: "Country", field: "country", },
    { title: "Shop", field: "shop_name", },
    { title: "Total", field: "total", type: 'numeric', },
    { title: "VAT", field: "vat", type: 'numeric', },
    { title: "Status", field: "status", type: 'numeric', },
  ];

  const testRefundableOrderData = [
    { country: "USA", shop_name: "Walmart", total: 25.15, vat: 1.76 },
    { country: "USA", shop_name: "Amazon", total: 19.09, vat: 1.34 },
    { country: "USA", shop_name: "Apple", total: 12.43, vat: 0.87 },
  ];

  const testRefundableOrderColumns = [
    { title: "Country", field: "country", },
    { title: "Shop", field: "shop_name", },
    { title: "Total", field: "total", type: 'numeric', },
    { title: "VAT", field: "vat", type: 'numeric', },
  ];

  return (
    <Container maxW="1300px" h='calc(100vh - 64px - 3rem)'>

        <Flex wrap='wrap-reverse'>
          <Flex w={{sm:'100%', lg:'50%'}} direction='column' > 
            <Flex borderRadius="10px" direction='row' alignItems='center'>
              <Spacer />
              <Flex direction='column' textAlign='right'> 
                <Text fontSize="1.25rem">Pending Orders</Text>
                <Text fontSize="1.75rem" fontWeight='bold'>{refundableAmount} ETH</Text>
              </Flex>
            </Flex>
            <Table
              title="All Order"
              data={testAllOrderData}
              columns={testAllOrderColumns}
            />
          </Flex>
          <Flex w={{sm:'100%', lg:'50%'}} direction='column' >
            <Flex borderRadius="10px" direction='row' alignItems='center' >
            <Spacer />
                <Flex direction='column' textAlign='right'> 
                  <Text fontSize="1.25rem">Total Refundable Amount</Text>
                  <Text fontSize="1.75rem" fontWeight='bold'>{refundableAmount} ETH</Text>
                </Flex>
                <Button ml='6' px='5' colorScheme="teal" ml='5'>Claim</Button>
            </Flex>
            <Table
              title="Refundable Order"
              data={testRefundableOrderData}
              columns={testRefundableOrderColumns}
            />
          </Flex> 

        </Flex>
        {/* <Box w="250px">
          <Center>
            <Text fontSize="24px" as="b" paddingTop="27px" paddingBottom="18px">My QR Code</Text>
          </Center>
          <Center>
            <Image boxSize="200px" borderRadius="5%" src={QRCode} alt="qrcode" />
          </Center>
        </Box> */}
    </Container> 
  );
}

export default TouristPage;
