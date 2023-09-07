const router = require("express").Router();
const { ControllerMovie } = require("../controllers");
router.get("/", ControllerMovie.readMovies);
router.post("/", ControllerMovie.createMovie);
router.get("/:id", ControllerMovie.readMovieById);
router.put("/:id", ControllerMovie.updateMovie);
router.delete("/:id", ControllerMovie.deleteMovie);
module.exports = { movieRouter: router };

/*
removedCast(id)
newCast(dataCast)
bulkDestroy
bulkCreate
*/
