import React, { useEffect, useState } from 'react';
import { Container, Flex, Spacer, Box, Center, Text, Image, Button } from "@chakra-ui/react";
import Table from '../../components/Table/Table';
import { useContractMethod, useOrder, useRefundAmount } from '../../utils/hooks';
import { useEthers } from '@usedapp/core';
import { Order, OrderView, _orderTransformer } from '../../utils/getter';

function TouristPage() {
  const { state: claimRefundState, send: claimRefund }   = useContractMethod("refund");

  const { account }  = useEthers(); 

  const orders = useOrder();

  // Todo: add more countries
  const refund = useRefundAmount(account, orders?.map((x:Order)=>x.id), 'TH')
  const handleClaimRefund = () => claimRefund(account, 'TH')

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
  
  const allOrders = orders?.map((x:Order) => _orderTransformer(x));
  const _ordersSum = allOrders?.map((x:OrderView)=>x.itemTotal).reduce((x:number,sum:number)=>x+sum);
  console.log(_ordersSum);
  
  return (
    <Container maxW="1300px" h='calc(100vh - 64px - 3rem)'>

        <Flex wrap='wrap-reverse' direction='row'>
          <Flex w='100%' direction='column' > 
            <Flex direction='row' alignItems='center' mx='3rem' p='3' px='3rem' bg='blackAlpha.400' borderRadius='10px'>
              <Flex direction='column' textAlign='left' > 
                <Text fontSize="1.25rem">Pending Orders</Text>
                <Text fontSize="1.75rem" fontWeight='bold'>{_ordersSum} ETH</Text>
              </Flex>
              <Spacer/>
              <Flex direction='row' alignItems='center'>
                <Flex direction='column' textAlign='right' color='teal.100' pl='5rem' > 
                  <Text fontSize="1.25rem">Total Refundable Amount</Text>
                  <Text fontSize="1.75rem" fontWeight='bold' >{refund ?? '0'} ETH</Text>
                </Flex>
                <Button ml='6' px='5' colorScheme="teal" disabled={!!!refund}>Claim</Button>
              </Flex>
            </Flex>
            <Flex mx='3rem'> 
              <Table
                title="All Order"
                data={allOrders}
                columns={tableColumns}
              />
            </Flex>
          </Flex>
        </Flex>
    </Container> 
  );
}

export default TouristPage;
