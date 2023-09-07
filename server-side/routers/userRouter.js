"use strict";
const { ControllerUser } = require("../controllers");
const router = require("express").Router();
router.post("/login", ControllerUser.login);
router.post("/register", ControllerUser.register);
module.exports = { userRouter: router };
