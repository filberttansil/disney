import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import BaseLayout from "../layouts/BaseLayout";
import HomePage from "../pages/HomePage";
import MaintenancePage from "../pages/MaintenancePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import Register from "../pages/RegisterPage";
const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/maintenance",
        element: <MaintenancePage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetailPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        throw redirect("/");
      }

      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        throw redirect("/");
      }

      return null;
    },
  },
]);
export default router;
