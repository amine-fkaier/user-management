import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import React from "react";
import { Routes } from "./routes/Routes";


ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={Routes} />
);