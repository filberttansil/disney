// IMPORT useDispatch dan useSelector DARI REACT REDUX AGAR DAPAT MENGGUNAKAN STORE
import { useDispatch, useSelector } from "react-redux";
// IMPORT ACTION UTK DI DISPATCH/SELECTOR
import {
  deleteMovie,
  fetchMovies,
} from "../stores/actions/actionCreators.js/movie";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
export default function MovieList() {
  const navigate = useNavigate();
  // MEMBACA STATE
  const { movies: data, moviesLoading: loading } = useSelector(
    (state) => state.movie
  );

  // VARIABLE MENAMPUNG DISPATCH
  const dispatch = useDispatch();

  const handleDeleteMovie = (id) => {
    try {
      dispatch(deleteMovie(id));
      toast.success(`Movie ${id} deleted`);
    } catch (error) {
      console.log(error);
    }
  };

  // DISPATCH FETCHMOVIES DENGAN useEffect
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="ml-64 mt-10">
      <div className="flex justify-between pb-4 px-4">
        <h1 className="text-start text-2xl font-semibold">Movie List</h1>
        <button
          onClick={() => navigate("/new-movie-form")}
          className="bg-blue-900 text-white p-2 rounded-md hover:bg-blue-950"
        >
          Add Movies
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Genre
              </th>
              <th scope="col" className="px-6 py-3">
                Synopsis
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-10 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((movie) => (
              <tr
                className="bg-white border-b hover:bg-gray-50 "
                key={movie.id}
              >
                <td className="px-6 py-4">{movie.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {movie.title}
                </td>
                <td className="px-6 py-4">{movie.GenreId}</td>
                <td className="px-6 py-4 ">{movie.synopsis}</td>
                <td>
                  <img className="w-[100px]" src={movie.imgUrl} />
                </td>
                <td className="flex flex-col gap-2 px-4 pt-6">
                  <button
                    onClick={() => navigate(`/edit-movie-form/${movie.id}`)}
                    className="font-medium text-white  bg-blue-600 hover:bg-blue-700 rounded-md text-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMovie(movie.id)}
                    className="font-medium text-white  bg-red-600 hover:bg-red-700 rounded-md text-center"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/movie-detail/${movie.id}`)}
                    className="font-medium text-white  bg-green-600 hover:bg-green-700 rounded-md text-center"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
