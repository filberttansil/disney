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
]);
export default router;
