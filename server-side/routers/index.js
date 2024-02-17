"use strict";

const router = require("express").Router();
const { publicRouter } = require("./publicRouter");
const { userRouter } = require("./userRouter");
const { genreRouter } = require("./genreRouter");
const { movieRouter } = require("./movieRouter");
const { authentication } = require("../middlewares");

// Client Routes
router.use("/public", publicRouter);

// Admin Routes
router.use("/", userRouter);
router.use(authentication);
router.use("/genre", genreRouter);
router.use("/movie", movieRouter);
module.exports = router;
