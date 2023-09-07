"use strict";

const bcrypt = require("bcrypt");

async function loginValidation(user, email, password) {
  try {
    const data = await user.findOne({ where: { email } });

    if (!data) {
      throw { name: "InvalidLogin" };
    }

    const isValidPassword = bcrypt.compareSync(password, data.password);

    if (!isValidPassword) {
      throw { name: "InvalidLogin" };
    }

    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = { loginValidation };
