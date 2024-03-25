import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import React from "react";
import ErrorPage from "./routes/ErrorPage";
import AddOrUpdateUser from "./components/AddOrUpdateUser/AddOrUpdateUser"
import App from "./App";
import { UserProvider } from "./context/UserContext";

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);