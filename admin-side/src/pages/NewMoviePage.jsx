import MovieForm from "../components/MovieForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  createMovie,
  updateMovie,
} from "../stores/actions/actionCreators.js/movie";
import { toast } from "react-toastify";
import { fetchGenres } from "../stores/actions/actionCreators.js/genre";
export default function NewMoviesForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destruct id utk Conditional isi state
  const { id } = useParams();

  // STATE GENRES UNTUK LOOP SELECT
  const { genres } = useSelector((state) => state.genre);

  // States utk cari targetedMovie
  const { movies } = useSelector((state) => state.movie);

  const [newMovieForm, setNewMovieForm] = useState({
    title: "",
    synopsis: "",
    trailerUrl: "",
    imgUrl: "",
    rating: "",
    GenreId: "",
    casts: [
      { name: "", profilePict: "" },
      { name: "", profilePict: "" },
      { name: "", profilePict: "" },
    ],
  });

  // Menggunakan useEffect utk memantau id agar setter tidak infinite
  useEffect(() => {
    // Jika param id ada kita set newMovieForm dengan defaultValuenya dgn movie yg akan di update
    if (id) {
      // console.log(movies);
      const targetedMovie = movies.find((movie) => movie.id === +id);
      // console.log(targetedMovie.Casts);
      setNewMovieForm({
        title: targetedMovie.title,
        synopsis: targetedMovie.synopsis,
        trailerUrl: targetedMovie.trailerUrl,
        imgUrl: targetedMovie.imgUrl,
        rating: targetedMovie.rating,
        GenreId: targetedMovie.Genre.id,
        casts: targetedMovie.Casts,
      });
    }
  }, [id]);

  const handleChangeMovie = (event) => {
    const { name, value } = event.target;
    setNewMovieForm({
      ...newMovieForm,
      [name]: value,
    });
  };

  const handleChangeCast = (event, index) => {
    const newArrObjCasts = [...newMovieForm.casts];
    newArrObjCasts[index][event.target.name] = event.target.value;
    setNewMovieForm({ ...newMovieForm, casts: newArrObjCasts });
  };
  const handleAddFormCast = () => {
    // Buat template
    const newObj = { name: "CastNamePlease", profilePict: "UrlPlease" };

    // set arrObj casts dengan menambahkan newObj
    setNewMovieForm({
      ...newMovieForm,
      casts: [...newMovieForm.casts, newObj],
    });
    console.log(newMovieForm.casts);
  };

  // Handler untuk delete menerima index untuk di splice
  const handleDeleteCast = (index) => {
    try {
      // Validasi agar tetap minimal 3
      if (newMovieForm.casts.length <= 3) {
        throw { name: "Movie cast should be minimal 3" };
      }
      // Membuat arrObj baru utk setter form
      const newArrObj = [...newMovieForm.casts];

      // Menggunakan splice utk menghapus obj dengan index yg sama dengan param
      // Param pertama adalah index kebrp yg mau dihapus
      // Yang kedua adalah index setelah index yg terhapus
      newArrObj.splice(index, 1);

      // Set property casts form dengan arrObj yang baru
      setNewMovieForm({ ...newMovieForm, casts: newArrObj });
    } catch (error) {
      console.log(error);
      toast.error(error.name || "Internal Server Error");
    }
  };
  // Fungsi utk validasi arrayObject casts
  const validateCasts = (casts) => {
    for (let cast of casts) {
      if (cast.name === "" || cast.profilePict === "") {
        return false;
      } else {
        return true;
      }
    }
  };

  // Fungsi utk validasi newMovieForm
  const validateNewMovieForm = (form) => {
    for (let key in form) {
      if (form[key] === "") {
        return false;
      } else {
        return true;
      }
    }
  };
  // EVENT HANDLER YANG AKAN DI PASANG DI FORM
  const handleSubmit = (event) => {
    try {
      event.preventDefault();

      // Tidak ada id berarti lagi membuat movie baru
      if (!id) {
        const title = newMovieForm.title;
        // Validasi

        if (!validateNewMovieForm(newMovieForm))
          throw { name: "All field is required" };
        if (!validateCasts(newMovieForm.casts))
          throw { name: "All Cast field is required" };

        if (newMovieForm.rating < 1) throw { name: "Movie rating -1 ? LOL" };
        dispatch(createMovie(newMovieForm));
        // Set form menjadi kosong
        setNewMovieForm({
          title: "",
          synopsis: "",
          trailerUrl: "",
          imgUrl: "",
          rating: null,
          GenreId: null,
          casts: [
            { name: "", profilePict: "" },
            { name: "", profilePict: "" },
            { name: "", profilePict: "" },
          ],
        });
        // Balik ke movie list
        navigate("/");
        toast.success(`${title} created!`);
      } else {
        // Validasi
        const title = newMovieForm.title;
        if (!validateNewMovieForm(newMovieForm))
          throw { name: "All field is required" };
        if (!validateCasts(newMovieForm.casts))
          throw { name: "All Cast field is required" };
        if (newMovieForm.rating < 1)
          throw { name: "Movie rating below 1 ? LOL" };
        // Jika ada id berarti kita akan mengupdate sebuah movie
        dispatch(updateMovie(id, newMovieForm));

        // Set form menjadi kosong
        setNewMovieForm({
          title: "",
          synopsis: "",
          trailerUrl: "",
          imgUrl: "",
          rating: null,
          GenreId: null,
          casts: [
            { name: "", profilePict: "" },
            { name: "", profilePict: "" },
            { name: "", profilePict: "" },
          ],
        });
        toast.success(`${title} updated!`);
        // Balik ke movie list
        navigate("/");
      }
    } catch (err) {
      toast.error(err.name);
    }
  };
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  return (
    <>
      <MovieForm
        movie={newMovieForm}
        genres={genres}
        casts={newMovieForm.casts}
        handleChangeMovie={handleChangeMovie}
        handleChangeCast={handleChangeCast}
        handleAddFormCast={handleAddFormCast}
        handleSubmit={handleSubmit}
        formName={"Movie Form"}
        handleDeleteCast={handleDeleteCast}
      />
    </>
  );
}
