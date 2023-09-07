import Button from "./Button";
export default function MovieForm({
  movie,
  handleChangeMovie,
  handleSubmit,
  formName,
  genres,
  handleChangeCast,
  handleAddFormCast,
  handleDeleteCast,
}) {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 min-w-[800px]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              {formName}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Title
                </label>
                <input
                  onChange={handleChangeMovie}
                  value={movie.title}
                  name="title"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Movie title ..."
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Synopsis
                </label>
                <textarea
                  value={movie.synopsis}
                  onChange={handleChangeMovie}
                  name="synopsis"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Movie synopsis ..."
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Trailer Url
                </label>
                <input
                  value={movie.trailerUrl}
                  onChange={handleChangeMovie}
                  name="trailerUrl"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Trailer url ..."
                  required=""
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Image Url
                </label>
                <input
                  value={movie.imgUrl}
                  onChange={handleChangeMovie}
                  name="imgUrl"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Image url ..."
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Rating
                </label>
                <input
                  value={movie.rating}
                  onChange={handleChangeMovie}
                  name="rating"
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Rating ..."
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Genre
                </label>
                <select
                  onChange={handleChangeMovie}
                  name="GenreId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option defaultValue={""}>Choose category</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Movie Casts:</h1>
                <p
                  onClick={handleAddFormCast}
                  className="flex items-center hover:underline cursor-pointer border rounded-md bg-green-400 p-2 hover:bg-green-500"
                >
                  Add Cast
                </p>
              </div>

              {movie.casts.map((cast, index) => (
                <div key={index} className="flex w-full gap-6 items-center">
                  <div className="w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Cast Name
                    </label>
                    <input
                      value={cast.name}
                      onChange={(event) => handleChangeCast(event, index)}
                      name="name"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                      placeholder="Cast Name ..."
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Cast Profile Picture URL
                    </label>
                    <input
                      value={cast.profilePict}
                      onChange={(event) => handleChangeCast(event, index)}
                      name="profilePict"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                      placeholder="Image url ..."
                      required=""
                    />
                  </div>
                  <p
                    onClick={() => handleDeleteCast(index)}
                    className="pt-6 hover:underline cursor-pointer"
                  >
                    Delete
                  </p>
                </div>
              ))}
              <Button />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
