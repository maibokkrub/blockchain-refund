import React, { useEffect, useState } from 'react';
import { Container, Flex, Spacer, Box, Center, Text, Image, Button } from "@chakra-ui/react";
import Table from '../../components/Table/Table';
import { useOrder, useRefundAmount } from '../../utils/hooks';
import { useEthers } from '@usedapp/core';
import { Order, _orderTransformer } from '../../utils/getter';

function TouristPage() {

  const [refundableAmount, setRefundableAmount] = useState(0.25);
  const { account }  = useEthers(); 

  const orders = useOrder();
  const refund = useRefundAmount(account, orders?.map((x:Order)=>x.id), 'TH');

  useEffect(() => {
    console.log("acc", account);
    console.log("orders", orders)
    console.log("refund", refund) 
  }, [orders,refund])

  // All Table Definitions
  const tableColumns = [
    { title: "Country", field: "country", },
    { title: "Name", field: "itemName", },
    { title: "Shop", field: "shopName", },
    { title: "Amount", field: "itemAmount", type: 'numeric', },
    { title: "Price", field: "itemPrice", type: 'numeric', },
    { title: "Total", field: "itemTotal", type: 'numeric', },
    { title: "Status", field: "status", type: 'numeric', },
  ];
  
  const testAllOrderData = orders?.map((x:Order) => _orderTransformer(x));
  const testRefundableOrderData = [
    { country: "USA", shop_name: "Walmart", total: 25.15, vat: 1.76 },
    { country: "USA", shop_name: "Amazon", total: 19.09, vat: 1.34 },
    { country: "USA", shop_name: "Apple", total: 12.43, vat: 0.87 },
  ];
  

  return (
    <Container maxW="1300px" h='calc(100vh - 64px - 3rem)'>

        <Flex wrap='wrap-reverse' direction='row'>
          <Flex w='100%' direction='column' > 
            <Flex direction='row' alignItems='center'>
              <Spacer />
              <Flex direction='column' textAlign='right' mx='2rem'> 
                <Text fontSize="1.25rem">Pending Orders</Text>
                <Text fontSize="1.75rem" fontWeight='bold'>{refundableAmount} ETH</Text>
              </Flex>
            </Flex>
            <Table
              title="All Order"
              data={testAllOrderData}
              columns={tableColumns}
            />
          </Flex>
          <Flex w='100%' direction='column' >
            <Flex direction='row' alignItems='center' mx='2rem'>
            <Spacer />
                <Flex direction='column' textAlign='right' color='teal.100' pl='5rem' > 
                  <Text fontSize="1.25rem">Total Refundable Amount</Text>
                  <Text fontSize="1.75rem" fontWeight='bold' >{refundableAmount} ETH</Text>
                </Flex>
                <Button ml='6' px='5' colorScheme="teal">Claim</Button>
            </Flex>
            <Table
              title="Refundable Order"
              data={testRefundableOrderData}
              columns={tableColumns}
            />
          </Flex> 

        </Flex>

    </Container> 
  );
}

export default TouristPage;
