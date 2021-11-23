import React from "react";
import { Flex, Box, Heading, Spacer, HStack } from "@chakra-ui/react";

import Connector from "../Connector/Connector";
import { Link, NavLink } from "react-router-dom";

function NavBar(){ 
    
    return ( 
        <Flex h='64px' p={{base:'2', lg:'5'}} my='1rem' align='center' alignContent='space-between'> 
        <Box ml='5'>
            <Heading><Link to="/"> TBA </Link></Heading>
        </Box>
        <Spacer />
        <HStack p='4'>
            <HStack spacing='2rem' pr='2rem' display={{base:'none', md:'inline'}}>
                <Link to='/tourist'>Tourist</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/government'>Government</Link>
            </HStack>
            <Connector />
        </HStack>
        </Flex>
    ); 
}

export default NavBar;