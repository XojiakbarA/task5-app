import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {AppProvider} from "./context/AppProvider";
import {StompSessionProvider} from "react-stomp-hooks";
import {BASE_URL} from "./api";
import {theme} from "./utils/theme";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <StompSessionProvider
            url={BASE_URL + '/ws/'}
            onConnect={ () => console.log("connected") }
        >
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <AppProvider>
                        <CssBaseline/>
                        <App/>
                    </AppProvider>
                </ThemeProvider>
            </BrowserRouter>
        </StompSessionProvider>
    </React.StrictMode>
);