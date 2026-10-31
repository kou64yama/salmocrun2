import React from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { BrowserRouter } from "react-router";
import "@mantine/core/styles.css";
import "./style.css";
import App from "./App";
const theme = createTheme({ primaryColor: "orange" });
const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
createRoot(root).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
