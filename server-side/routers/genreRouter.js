const router = require("express").Router();
const { ControllerGenre } = require("../controllers");
router.get("/", ControllerGenre.readGenres);
router.post("/", ControllerGenre.createGenre);
router.put("/:id", ControllerGenre.updateGenre);
router.delete("/:id", ControllerGenre.deleteGenre);
module.exports = { genreRouter: router };
