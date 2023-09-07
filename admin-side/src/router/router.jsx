import * as React from "react";
import { Outlet, redirect } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MovieListPage from "../pages/MovieListPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import NewGenrePage from "../pages/NewGenrePage";
import NewMoviesFormPage from "../pages/NewMoviePage";
import BaseLayout from "../layouts/BaseLayout";
import GenreListPage from "../pages/GenreListPage";
import EditGenreFormPage from "../pages/EditGenrePage";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    // Loader jika ada access_token namun mengakses login
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        throw redirect("/");
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    // Loader jika tidak ada access_token namun mengakses home
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
        element: <MovieListPage />,
      },
      {
        path: "/genres",
        element: <GenreListPage />,
      },

      {
        path: "/register-admin",
        element: <RegisterPage />,
      },

      {
        path: "/movie-detail/:id",
        element: <MovieDetailPage />,
      },
      {
        path: "/new-genre-form",
        element: <NewGenrePage />,
      },
      {
        path: "/new-movie-form",
        element: <NewMoviesFormPage />,
      },
      {
        path: "/edit-movie-form/:id",
        element: <NewMoviesFormPage />,
      },
      {
        path: "/edit-genre-form/:GenreId",
        element: <EditGenreFormPage />,
      },
    ],
  },
]);

export default router;
