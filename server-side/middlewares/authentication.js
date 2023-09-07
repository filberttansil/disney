"use strict";

const { verifyToken } = require("../helpers");
const { User, Customer } = require("../models");

const authentication = async (req, res, next) => {
  try {
    console.log("authenticating...");
    const { access_token } = req.headers;

    const payload = verifyToken(access_token);

    const result = await User.findByPk(payload.id);

    req.user = {
      id: result.id,
      username: result.username,
      email: result.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

const authenticationCustomer = async (req, res, next) => {
  try {
    console.log("authenticating...");
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "LoginFirst" };
    }

    const payload = verifyToken(access_token);

    const result = await Customer.findByPk(payload.id);

    req.customer = {
      id: result.id,
      email: result.email,
      role: result.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication, authenticationCustomer };
