import React from "react";
import { Flex, Box, Heading, Spacer, HStack } from "@chakra-ui/react";

import Connector from "../Connector/Connector";
import { Link } from "react-router-dom";

function NavBar(){ 
    
    return ( 
        <Flex h='64px' p={{base:'2', lg:'5'}} mb='1rem' align='center' alignContent='space-between'> 
        <Box ml='5'>
            <Heading>TBA</Heading>
        </Box>
        <Spacer />
        <HStack p='4'>
            <HStack spacing='2rem' pr='2rem' display={{base:'none', md:'inline'}}>
                <Link to='/user'> User </Link>
                <Link to='/admin'>Admin </Link>
                <Link to='/shop'> Shop </Link>
            </HStack>
            <Connector />
        </HStack>
        </Flex>
    ); 
}

export default NavBar;