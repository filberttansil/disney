import Button from "../components/Button";
import GenreForm from "../components/GenreForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../stores/actions/actionCreators.js/genre";
import { toast } from "react-toastify";
export default function NewGenreForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [genreForm, setGenreForm] = useState({ name: "" });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setGenreForm({
      ...genreForm,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (genreForm.name === "") throw { name: "Genre Name is Required!" };
      dispatch(createGenre(genreForm));
      navigate("/genres");
      toast.success(`Genre ${genreForm.name} created!`);
    } catch (err) {
      console.log(err);
      toast.error(err.name);
    }
  };
  return (
    <>
      <GenreForm
        formName={"Add New Genre"}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={genreForm.name}
      />
    </>
  );
}
