import './index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';

const renderHookUrl =
'https://api.render.com/deploy/srv-ctsoerbqf0us73dv3bhg?key=UT3FnoZfQPI';

if (!renderHookUrl) {
  throw new Error("Render Hook URL is not defined. Please set REACT_APP_RENDER_HOOK_URL in your .env file.");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<Signup />),
  },
  {
    path: "/add-product",
    element: (<AddProduct />),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
