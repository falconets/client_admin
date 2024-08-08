import { useContext } from "react";
import { AppContext } from "./credentials";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a CredentialProvider");
  }

  return context;
};
