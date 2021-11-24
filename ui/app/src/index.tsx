import React from "react";
import ReactDOM from "react-dom";
import { ColorModeScript } from "@chakra-ui/react";

import App from "./App";
import theme from "./theme";
import { DAppProvider } from "@usedapp/core";
import { config } from "./config";

import { DataProvider } from './components/DataContext/DataContext';

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DAppProvider config={config}>
            <DataProvider>
                <App />
            </DataProvider>
        </DAppProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
