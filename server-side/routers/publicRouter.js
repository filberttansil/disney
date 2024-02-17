const { ControllerPublic } = require("../controllers");
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Welcome to Disney Public API");
});

router.get("/movies", ControllerPublic.getMovies);
router.get("/movie/:id", ControllerPublic.getMovieDetail);

module.exports = { publicRouter: router };
