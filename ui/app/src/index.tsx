import React from "react";
import ReactDOM from "react-dom";
import { ColorModeScript } from "@chakra-ui/react";

import App from "./App";
import theme from "./theme";
import { DAppProvider } from "@usedapp/core";
import { config } from "./config";

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DAppProvider config={config}>
            <App />
        </DAppProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
