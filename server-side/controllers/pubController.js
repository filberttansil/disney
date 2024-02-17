const { Op } = require("sequelize");
const { Movie, Genre, Cast } = require("../models");

class ControllerPublic {
  static async getMovies(req, res, next) {
    try {
      const { title } = req.query;
      const searchCondition = title
        ? { title: { [Op.iLike]: `%${title}%` } }
        : {};
      const movies = await Movie.findAll({
        order: [["id", "ASC"]],
        where: searchCondition,
        include: [
          {
            model: Genre,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Cast,
            order: [["id", "ASC"]],
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async getMovieDetail(req, res, next) {
    try {
      const movie = await Movie.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Genre,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Cast,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      if (!movie) throw { name: "MovieNotFound" };
      res.status(200).json({ data: movie });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { ControllerPublic };
