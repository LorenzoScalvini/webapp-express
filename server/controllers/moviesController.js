import connection from "../config/db.js";

export const getMovies = (req, res) => {
  connection.query("SELECT * FROM movies", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getMovieById = (req, res) => {
  const movieId = req.params.id;
  connection.query(
    "SELECT * FROM movies WHERE id = ?",
    [movieId],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
};
