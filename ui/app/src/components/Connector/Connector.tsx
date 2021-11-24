import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useEthers } from '@usedapp/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

import WalletQR from "../QRCode/WalletQR";

function Connector(){
    const { activateBrowserWallet, account } = useEthers()
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen:false})

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
        <>
        <Button 
            onClick={onOpen}
            colorScheme='blue'
            leftIcon={<FontAwesomeIcon icon={faWallet}/>}
        > 
            { account?.slice(0,6)+'..'+account?.slice(-4) }
        </Button>
        <WalletQR isOpen={isOpen} onClose={onClose} />
        </>
        );
}

export default Connector;