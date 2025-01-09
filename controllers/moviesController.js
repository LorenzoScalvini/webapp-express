const connection = require("../data/db");

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
}

function show(req, res) {
  const id = req.params.id;
  const sqlMovie = "SELECT * FROM movies WHERE id = ?";

  connection.query(sqlMovie, [id], (err, movieResults) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (movieResults.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Movie not found",
      });
    }

    const movie = movieResults[0];
    const sqlReviews = "SELECT * FROM reviews WHERE movie_id = ?";

    connection.query(sqlReviews, [id], (err, reviewResults) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      movie.reviews = reviewResults;
      res.json(movie);
    });
  });
}

module.exports = { index, show };
