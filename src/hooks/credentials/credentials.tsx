import { ActionProps, StateProps } from "@types";
import { createContext, useReducer, useEffect, ReactNode } from "react";
import localforage from "localforage";

const initialState: StateProps = {
  isAuthenticated: false,
  userId: null,
};

const credentialReducer = (
  state: StateProps,
  action: ActionProps
): StateProps => {
  switch (action.type) {
    case "LOGIN": {
      const { userId } = action.payload || {};
      const auth:boolean = userId !== null
      console.log("userId: " + userId);
      console.log("isAuthenticated: " + auth);
      return {
        ...state,
        isAuthenticated: auth,
        userId: userId || null,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
      };
    }
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
    const loadCredentials = async () => {
      const userId = await localforage.getItem<string>("userId");

      if ( userId) {
        dispatch({
          type: "LOGIN",
          payload: { userId },
        });
      }
    };

    loadCredentials();
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      if (state.userId) localforage.setItem("userId", state.userId);
    } else {
      localforage.removeItem("userId");
    }
  }, [state.isAuthenticated, state.userId]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
