import ErrorPage from "./ErrorPage";
import AddOrUpdateUser from "../components/AddOrUpdateUser/AddOrUpdateUser"
import App from "../App";
import { createBrowserRouter } from "react-router-dom";

export const Routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "addUser",
      element: <AddOrUpdateUser />,
    },
    {
      path: "updateUser/:userId",
      element: <AddOrUpdateUser />,
    },
  ]);