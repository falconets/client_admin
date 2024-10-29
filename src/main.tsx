import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import client from "@auth";
import { CredentialProvider } from "@hooks/credentials/credentials";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CredentialProvider>
          <RouterProvider router={router} />
        </CredentialProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
