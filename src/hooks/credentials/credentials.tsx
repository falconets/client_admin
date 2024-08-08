import { ActionProps, StateProps } from "@types";
import { createContext, useReducer, useEffect, ReactNode } from "react";
import localforage from "localforage";

const getItem = async (key: string): Promise<string | null> => {
  return await localforage.getItem<string>(key);
};

const initialState: StateProps = {
  isAuthenticated: !!(await getItem("token")),
  token: await getItem("token"),
  userId: await getItem("userId"),
};

const credentialReducer = (state: StateProps, action: ActionProps): StateProps => {
  switch (action.type) {
    case "LOGIN":
      const { token, userId } = action.payload || {};
      return {
        ...state,
        isAuthenticated: !!token,
        token: token || null,
        userId: userId || null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: StateProps;
  dispatch: React.Dispatch<ActionProps>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CredentialProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(credentialReducer, initialState);

  useEffect(() => {
    if (state.isAuthenticated) {
      if (state.token) localforage.setItem("token", state.token);
      if (state.userId) localforage.setItem("userId", state.userId);
    } else {
      localforage.removeItem("token");
      localforage.removeItem("userId");
    }
  }, [state.isAuthenticated, state.token, state.userId]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
