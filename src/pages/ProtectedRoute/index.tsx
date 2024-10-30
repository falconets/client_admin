import { useAppContext } from "@credentials";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import Routes from "../../route";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: FC<Props> = ({ children }): React.ReactNode => {
  const { state } = useAppContext();

  if (!state.isAuthenticated) {
    return <Navigate to={Routes.signin} />;
  }

  return children;
};

export default ProtectedRoute;
