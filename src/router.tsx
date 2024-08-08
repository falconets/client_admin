import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signin from "./pages/AuthPages/SignIn/signin";
import Routes from "./route";
import ProtectedRoute from "./pages/ProtectedRoute";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <h1>Welcome home!</h1>,
      },
    ],
  },
  {
    path: Routes.signin,
    element: <Signin />,
  },
]);

export default route;
