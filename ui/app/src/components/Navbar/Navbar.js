import React from "react";
import { Flex, Box, Heading, Spacer } from "@chakra-ui/react";

import Connector from "../Connector/Connector";

function NavBar(){ 
    
    return ( 
    <Flex h='64px' p='2' mx='3' align='center' alignContent='space-between'> 
    <Box >
        <Heading>TBA</Heading>
    </Box>
    <Spacer />
    <Box>
        <Connector />
    </Box>
    </Flex>
    ); 
}

export default NavBar;