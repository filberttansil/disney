"use strict";

const errorHandler = (err, req, res, next) => {
  console.log(
    err,
    "this console.log is located on errorHandler.js in middlewares folder"
  );

  let statusCode;
  let message;

  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = "This email has already been used";
      break;

    case "MovieNotFound":
      statusCode = 404;
      message = "Movie not found";
      break;
    case "CategoryNotFound":
      statusCode = 404;
      message = "Category not found";
      break;

    case "InvalidLogin":
      statusCode = 401;
      message = "Invalid email or password";
      break;
    case "LoginFirst":
      statusCode = 401;
      message = "Login first to access this feature";
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      message = "Invalid Token";
      break;
    case "TokenExpiredError":
      statusCode = 401;
      message = "Login token expired, please login again to continue";
      break;

    case "NotAuthorized":
      statusCode = 403;
      message = "Not authorized to access this feature";
      break;

    case "NoEmail":
      statusCode = 400;
      message = "Email must be provided";
      break;
    case "NoPassword":
      statusCode = 400;
      message = "Password must be provided";
      break;
    case "NoEmailInput":
      statusCode = 400;
      message = "There must be an email input";
      break;
    case "NoPasswordInput":
      statusCode = 400;
      message = "There must be a password input";
      break;

    default:
      statusCode = 500;
      message = "Internal Server Error";
      break;
  }

  res.status(statusCode).json({ statusCode, message });
};

module.exports = { errorHandler };
