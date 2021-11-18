import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import NavBar from "./components/Navbar/Navbar";
import Route from "./routes"
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Route />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
