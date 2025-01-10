const connection = require("../data/db"); // Connessione al database

// Funzione per ottenere tutti i film con titolo e immagine
function index(req, res) {
  const sql = "SELECT * FROM movies"; // Query per selezionare id, titolo e immagine

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Errore nella query:", err); // Log per errori di query
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: "No movies found",
        message: "No movies found in the database",
      });
    }

    // Rispondi con i dati dei film
    res.json(results);
  });
}

// Funzione per ottenere un singolo film con recensioni
function show(req, res) {
  const id = req.params.id;
  const sqlMovie = "SELECT id, title, abstract FROM movies WHERE id = ?"; // Aggiunto anche l'immagine

  connection.query(sqlMovie, [id], (err, movieResults) => {
    if (err) {
      console.error("Errore nella query:", err); // Log per errori di query
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
        console.error("Errore nella query recensioni:", err); // Log per errori recensioni
        return res.status(500).json({ message: err.message });
      }

      // Aggiungi le recensioni al film
      movie.reviews = reviewResults;
      res.json(movie); // Rispondi con il film e le recensioni
    });
  });
}

module.exports = { index, show };
