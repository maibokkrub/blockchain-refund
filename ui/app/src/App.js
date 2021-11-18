import React from 'react';
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "./theme";

import NavBar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <ChakraProvider theme={theme} style={{width:'100vw', height:'100vh'}}>
      <NavBar />
      <Container bg='salmon'>
        test yarn deploy
      </Container>
    </ChakraProvider>
  );
}

export default App;
