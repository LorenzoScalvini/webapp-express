import connection from "../db.js";

// Funzione per ottenere la lista dei film
export const getMovies = (req, res) => {
  connection.query("SELECT * FROM movies", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Funzione per ottenere i dettagli di un singolo film
export const getMovie = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM movies WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "film non trovato" });
      }
      res.status(200).json(results[0]);
    }
  );
};
