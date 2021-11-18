import React from "react";
import { Button } from "@chakra-ui/react";
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Connector(){ 

    return ( 
    <Button 
        colorScheme='blue'
        leftIcon={<FontAwesomeIcon icon={faWallet}/>}
    > 
        Connect to Wallet
    </Button>
    ); 
}

export default Connector;