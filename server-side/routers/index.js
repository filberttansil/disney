"use strict";

const router = require("express").Router();
const { userRouter } = require("./userRouter");
const { genreRouter } = require("./genreRouter");
const { movieRouter } = require("./movieRouter");
const { authentication } = require("../middlewares");
router.use("/", userRouter);
router.use(authentication);
router.use("/genre", genreRouter);
router.use("/movie", movieRouter);
module.exports = router;
