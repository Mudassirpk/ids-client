import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Repos from "./pages/Repos.tsx";
import Login from "./pages/login.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/authprovider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "repos",
    element: <Repos />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export const query_client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={query_client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
