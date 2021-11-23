import React from "react";
import { Button } from "@chakra-ui/react";
import { useEthers } from '@usedapp/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

function Connector(){ 
    const { activateBrowserWallet, account } = useEthers()

    if (!account)
        return ( 
        <Button 
            onClick={()=>activateBrowserWallet()}
            colorScheme='blue'
            leftIcon={<FontAwesomeIcon icon={faWallet}/>}
        > 
            Connect to Wallet
        </Button>
        );
    else
        return ( 
            <Button 
            disabled
            colorScheme='blue'
            leftIcon={<FontAwesomeIcon icon={faWallet}/>}
        > 
            { account }
        </Button>
        );
}

export default Connector;