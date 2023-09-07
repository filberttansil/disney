import GenreForm from "../components/GenreForm";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editGenre } from "../stores/actions/actionCreators.js/genre";
import { useState } from "react";
export default function EditGenreForm() {
  // NGIRIM ID KE URL PARAM DI ROUTER
  const { GenreId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // BACA STATE DARI STORE
  const { genres } = useSelector((state) => state.genre);

  // CARI GENRE YANG INGIN DI UPDATE
  const targetedGenre = genres.find((genre) => {
    return genre.id === +GenreId;
  });
  // BUAT ALA V-MODEL DENGAN DEFAULT VALUENYA DI COMOT2
  const [genreForm, setGenreForm] = useState({
    id: GenreId,
    name: targetedGenre.name,
  });
  // EVENT HANDLER UTK NGESET ISI genreForm
  const handleChange = (event) => {
    const { name, value } = event.target;
    setGenreForm({
      ...genreForm,
      [name]: value,
    });
  };
  // INI DIPANGGIL DI TAG onSubmit
  const handleSubmit = (event) => {
    dispatch(editGenre(GenreId, genreForm));
    navigate("/genres");
    event.preventDefault();
  };

  return (
    <>
      <GenreForm
        formName={`Edit Genre : ${targetedGenre.name}`}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={genreForm.name}
      />
    </>
  );
}
