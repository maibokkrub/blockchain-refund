import React from "react";
import { Flex, Box, Heading, Spacer, HStack } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { useAdmin, useShop } from "../../utils/hooks";

import Connector from "../Connector/Connector";
import { Link } from "react-router-dom";

function NavBar(){ 
    const { account } = useEthers();
    const isAdmin = useAdmin(account);
    const isShop = useShop(account);
    
    return ( 
        <Flex h='64px' p={{base:'2', lg:'5'}} my='1rem' align='center' alignContent='space-between'> 
        <Box ml='5'>
            <Heading><Link to="/"> TBA </Link></Heading>
        </Box>
        <Spacer />
        <HStack p='4'>
            <HStack spacing='2rem' pr='2rem' display={{base:'none', md:'inline'}}>
                {(() => {
                    if (isAdmin) {
                        return (
                            <Link to='/government'>Government</Link>
                        )
                    } else if (isShop) {
                        return (
                            <Link to='/shop'>Shop</Link>
                        )
                    } else if (!account) {
                        return (
                            <></>
                        )
                    } else {
                        return (
                            <Link to='/tourist'>Tourist</Link>
                        )
                    }
                })()}
            </HStack>
            <Connector />
        </HStack>
        </Flex>
    ); 
}

export default NavBar;