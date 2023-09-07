import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteGenre,
  fetchGenres,
} from "../stores/actions/actionCreators.js/genre";
import { toast } from "react-toastify";
import Loader from "./Loader";

export default function CategoryList() {
  const navigate = useNavigate();
  const { genres, genresLoading } = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  // EVENT HANDLER UNTUK DIPASANG DI BUTTON
  const handleDelete = (id) => {
    try {
      dispatch(deleteGenre(id));
      toast.success(`Genre ${id} deleted!`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);
  if (genresLoading) return <Loader />;
  return (
    <section className="ml-64 mt-10">
      <div className="flex justify-between pb-4 px-4">
        <h1 className="text-start text-2xl font-semibold">Genre List</h1>
        <button
          onClick={() => navigate("/new-genre-form")}
          className="bg-blue-900 text-white p-2 rounded-md hover:bg-blue-950"
        >
          Add Genre
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
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {genres?.map((genre) => (
              <tr
                className="bg-white border-b hover:bg-gray-50 "
                key={genre.id}
              >
                <td className="px-6 py-4 ">{genre.id}</td>
                <td className="px-6 py-4 ">{genre.name}</td>

                <td className="px-6 py-4 flex flex-col ">
                  <a
                    onClick={() => navigate(`/edit-genre-form/${genre.id}`)}
                    className="font-medium text-blue-600 hover:underline hover:cursor-pointer"
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => handleDelete(genre.id)}
                    className="font-medium text-red-600 hover:underline hover:cursor-pointer"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
