const { Genre } = require("../models");
class ControllerGenre {
  static async createGenre(req, res, next) {
    try {
      const { name } = req.body;

      const newGenre = await Genre.create({
        name,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Genre created succesfully",
        data: newGenre,
      });
    } catch (err) {
      next(err);
    }
  }
  static async readGenres(req, res, next) {
    try {
      const { page } = req.query;

      let query = {};

      if (page) {
        query.limit = 8;
        query.offset = (page - 1) * 8;
      }

      const genres = await Genre.findAll(query);

      res.status(200).json({
        data: genres,
        dataLength: genres.length,
      });
    } catch (err) {
      next(err);
    }
  }
  static async updateGenre(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;

      const genre = await Genre.findByPk(id);

      const oldValue = genre;

      genre.name = name;

      await genre.save();

      res.status(200).json({
        statusCode: 200,
        message: `Genre name successfully change to ${genre.name}`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteGenre(req, res, next) {
    try {
      const { id } = req.params;
      const genre = await Genre.findByPk(id);
      if (!genre) {
        throw { name: "CategoryNotFound" };
      }

      await Genre.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: `Genre ${genre.name} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { ControllerGenre };
