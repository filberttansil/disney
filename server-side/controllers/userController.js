const { generateToken, loginValidation } = require("../helpers");
const { User } = require("../models/index");

class ControllerUser {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      // console.log("JALAN");
      const data = await loginValidation(User, email, password);
      console.log("ini dari login val", data);
      const access_token = generateToken({
        id: data.id,
        username: data.username,
        email: data.email,
      });

      res.status(200).json({
        statusCode: 200,
        message: access_token,
        email: data.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, username, phoneNumber, address } = req.body;

      const data = await User.create({
        email,
        password,
        username,
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        id: data.id,
        email: data.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { ControllerUser };
