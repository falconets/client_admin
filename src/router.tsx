import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signin from "@pages/AuthPages/SignIn/signin";
import Routes from "./route";
import ProtectedRoute from "@pages/ProtectedRoute";
import Dashboard from "@pages/App/DashBoard";
import ManageRoutes from "@pages/App/ManageRoutes";
import Signup from "@pages/AuthPages/Signup";
import Scheduler from "@pages/App/Scheduler";
import Buses from "@pages/App/Buses";
import ErrorPage from "@pages/App/ErrorPage";
import { useJsApiLoader } from "@react-google-maps/api";


const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: Routes.dashboard,
        element: <Dashboard />,
      },{
        path: Routes.buses,
        element:<Buses />
      },{
        path: Routes.manageRoutes,
        element: <ManageRoutes />,
      },{
        path:Routes.schedule,
        element: <Scheduler />,
      },{
        path: Routes.myProfile,
        element: <div>My profile</div>,
      },{
        path: Routes.newUser,
        element: <div>New User</div>,
      },{
        path: Routes.roles,
        element: <div>Roles</div>,
      }
    ],
  },
  {
    path: Routes.signin,
    element: <Signin />,
  },{
    path: Routes.signup,
    element: <Signup />,
  }
]);

export default route;
