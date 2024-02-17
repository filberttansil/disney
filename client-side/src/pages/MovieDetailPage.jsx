import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMoviesById } from "../stores/actions/actionCreators/movie";
import Loader from "../components/Loader";

export default function MovieDetailPage() {
  const { movie, movieLoading } = useSelector((state) => state.movie);

  const { id } = useParams();
  const dispatch = useDispatch();
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  useEffect(() => {
    dispatch(fetchMoviesById(id));
  }, []);
  if (movieLoading) return <Loader />;
  return (
    <div>
      <div className="container mx-auto py-10 ">
        <div className="p-6 shadow-md rounded-lg bg-gray-100">
          <div className="flex items-center">
            <img src={movie.imgUrl} className="w-1/4 h-auto rounded-md" />
            <div className="ml-6">
              <h1 className="text-3xl font-semibold">{movie.title}</h1>
              <p className="text-gray-600">
                Release Date: {formatDate(movie.createdAt)}
              </p>
              <p className="text-gray-600">Genre: {movie.Genre.name} </p>
              <p className="text-gray-600">Rating: {movie.rating}/10</p>
            </div>
          </div>
          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Synopsis:</h2>
            <p className="text-gray-700">{movie.synopsis}</p>
          </div>
          {/* Trailer */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Trailer</h2>
            <iframe
              width="560"
              height="315"
              src={movie.trailerUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          {/* Cast */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Cast:</h2>
            <div className="flex gap-2">
              {movie.Casts.map((cast, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <img
                    className="w-[200px] h-[250px] rounded-md"
                    src={cast.profilePict}
                  />
                  <p className="font-light">
                    {index + 1}. {cast.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
