import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import client from "@auth";
import { CredentialProvider } from "@hooks/credentials/credentials";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { CssBaseline, CssVarsProvider } from "@mui/joy";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
       <CssBaseline />
      <CredentialProvider>
        <RouterProvider router={router} />
      </CredentialProvider>
      </CssVarsProvider>
    </ApolloProvider>
  </React.StrictMode>
);
