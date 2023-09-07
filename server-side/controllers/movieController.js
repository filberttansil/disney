const { Movie, Genre, Cast } = require("../models");
const { generateSlug } = require("../helpers");
// require sequelize dari model
const { sequelize } = require("../models");
class ControllerMovie {
  static async createMovie(req, res, next) {
    const trx = await sequelize.transaction();
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, GenreId, casts } =
        req.body;
      // AuthorId
      const AuthorId = req.user.id;
      // Slug
      const slug = generateSlug(title);

      // CREATE MOVIE
      const newMovie = await Movie.create(
        {
          title,
          slug,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          GenreId,
          AuthorId,
        },
        { transaction: trx }
      );
      // console.log(newMovie.id, "MOVIE ID YG BARU");

      //CREATING CAST
      const dataCasts = casts.map((cast) => ({
        ...cast,
        MovieId: newMovie.id,
      }));

      const newCasts = await Cast.bulkCreate(dataCasts, { transaction: trx });

      const data = { newMovie, newCasts };

      // COMMIT SETELAH SIAP
      await trx.commit();
      res.status(201).json({
        statusCode: 201,
        message: "Movie created succesfully",
        data,
      });
    } catch (err) {
      await trx.rollback();
      next(err);
    }
  }
  static async readMovies(req, res, next) {
    try {
      const { page } = req.query;

      let query = {
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

        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      };

      if (page) {
        query.limit = 8;
        query.offset = (page - 1) * 8;
      }

      const movies = await Movie.findAll(query);

      res.status(200).json({
        data: movies,
        dataLength: movies.length,
      });
    } catch (err) {
      next(err);
    }
  }
  static async readMovieById(req, res, next) {
    const trx = await sequelize.transaction();
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
        transaction: trx,
      });
      if (!movie) throw { name: "MovieNotFound" };
      await trx.commit();
      res.status(200).json({ data: movie });
    } catch (err) {
      await trx.rollback();
      next(err);
    }
  }
  static async updateMovie(req, res, next) {
    try {
      // NERIMA REQBODY
      const { title, synopsis, trailerUrl, imgUrl, rating, GenreId, casts } =
        req.body;
      //   console.log(req.body);

      // CARI MOVIE SESUAI PARAM ID
      const movie = await Movie.findByPk(req.params.id);

      // console.log(JSON.stringify(movie, null, 4)); <= cara membaca data dari response

      if (!movie) throw { name: "MovieNotFound" };
      //   console.log(movie);

      //   UPDATE MOVIE
      const updatedMovie = await Movie.update(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          GenreId,
        },
        { where: { id: req.params.id }, returning: true }
      );

      //   DELETE SEMUA CAST YG MovieId = movie.id

      //  Delete semua yg memiliki MovieId yg sama dengan movie.id
      await Cast.destroy({ where: { MovieId: movie.id } });

      //CREATING CAST
      await Cast.bulkCreate(
        casts.map((cast) => ({ ...cast, MovieId: movie.id }))
      );

      res.status(200).json({
        message: `Movie with id:${movie.id} updated successfully!`,
        movieBefore: movie,
        movieAfter: updatedMovie[1][0],
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteMovie(req, res, next) {
    try {
      const movie = await Movie.findByPk(req.params.id);
      if (!movie) throw { name: "MovieNotFound" };

      await Movie.destroy({ where: { id: movie.id } });
      res
        .status(200)
        .json({ message: `Movie id: ${movie.id} deleted succesfully!` });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { ControllerMovie };
