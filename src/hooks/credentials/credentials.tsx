import { ActionProps, StateProps } from "@types";
import { createContext, useReducer, useEffect, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import queries from "@api/queries";

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
      return {
        ...state,
        isAuthenticated: !!userId,
        userId: userId || null,
      };
    }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
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
  const { data, loading, error } = useQuery(queries.validateSession);

  // Load initial state from localStorage if available
  useEffect(() => {
    const savedState = localStorage.getItem("authState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState.isAuthenticated && parsedState.userId) {
        dispatch({ type: "LOGIN", payload: { userId: parsedState.userId } });
      }
    }
  }, []);

  // Update localStorage whenever authentication state changes
  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem("authState", JSON.stringify(state));
    } else {
      localStorage.removeItem("authState");
    }
  }, [state]);

  // Session validation using Apollo Client's useQuery
  useEffect(() => {
    if (!loading && !error && data) {
      const userId = data.validateSession;
      dispatch({ type: "LOGIN", payload: { userId } });
    } else if (!loading && error) {
      console.log("No active session found:", error);
    }
  }, [data, loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
