import React from "react";
import { Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Center, } from "@chakra-ui/react";
import { useEthers } from '@usedapp/core'
import QRCode from "react-qr-code";


function WalletQR({isOpen, onClose}:any){
    const { account } = useEthers()

    return ( 
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py='4'>
          <ModalHeader>Your QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Center>
            <QRCode value={account ?? ''} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
}

export default WalletQR;