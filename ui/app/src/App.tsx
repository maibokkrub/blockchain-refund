import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import NavBar from "./components/Navbar/Navbar";
import Route from "./routes";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <RecoilRoot>
                <BrowserRouter>
                    <NavBar />
                    <Route />
                </BrowserRouter>
            </RecoilRoot>
        </ChakraProvider>
    );
}

export default App;
