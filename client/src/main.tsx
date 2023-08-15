import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import customTheme from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
