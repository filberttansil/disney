import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../stores/actions/actionCreators/movie";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const dispatch = useDispatch();
  const elementRef = useRef();
  const navigate = useNavigate();
  const { movies, moviesLoading } = useSelector((state) => state.movie);

  const screenWidth = window.innerWidth;
  const sliderRight = (element) => {
    element.scrollLeft += screenWidth - 110;
  };
  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidth - 110;
  };
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  if (moviesLoading) return <Loader />;
  return (
    <section>
      <HiChevronLeft
        className="text-blue-200 text-[50px] absolute mx-8 mt-[300px] cursor-pointer"
        onClick={() => sliderLeft(elementRef.current)}
      />
      <HiChevronRight
        className="text-blue-200 text-[50px] absolute mx-8 mt-[300px] cursor-pointer right-0"
        onClick={() => sliderRight(elementRef.current)}
      />
      <div
        className="flex overflow-x-auto w-full px-16 py-4 scrollbar-hide scroll-smooth h-screen"
        ref={elementRef}
      >
        {movies.map((movie, idx) => (
          <img
            onClick={() => {
              navigate(`/movie/${movie.id}`);
            }}
            key={idx}
            className="w-[500px] object-cover object-left-top mr-5 rounded-md hover:border-[4px] border-gray-300 transition-all duration-100 ease-in "
            src={movie.imgUrl}
          />
        ))}{" "}
      </div>
    </section>
  );
}
