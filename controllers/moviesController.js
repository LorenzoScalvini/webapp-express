const connection = require("../data/db");

async function index(req, res) {
  let sql = `SELECT * FROM movies`;

  try {
    const [movies] = await connection.query(sql);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function show(req, res) {
  const id = req.params.id;
  let sql = `SELECT * FROM movies WHERE id = ?`;

  try {
    const [moviesResults] = await connection.query(sql, [id]);
    if (moviesResults.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Movie not found",
      });
    }

    const movie = moviesResults[0];
    sql = `SELECT * FROM reviews WHERE movie_id = ?`;
    const [reviewsResults] = await connection.query(sql, [id]);
    movie.reviews = reviewsResults;

    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { index, show };
