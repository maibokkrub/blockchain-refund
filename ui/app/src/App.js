import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { DAppProvider } from '@usedapp/core';
import theme from "./theme";
import {config} from './config'

import NavBar from "./components/Navbar/Navbar";
import Route from "./routes"

function App() {
  return (
    <ChakraProvider theme={theme}>      
      <DAppProvider config={config}>
        <RecoilRoot>
        <BrowserRouter>
          <NavBar />
          <Route />
        </BrowserRouter>
        </RecoilRoot>
      </DAppProvider>
    </ChakraProvider>
  );
}

export default App;
