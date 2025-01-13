const connection = require("../data/db"); // Importiamo la connessione al database dal modulo 'db'. Il file 'db.js' gestisce la connessione al database.

// Funzione per ottenere l'elenco dei film
function index(req, res) {
  // Scriviamo la query SQL per ottenere tutti i film e la media delle recensioni.
  // Viene utilizzato un 'LEFT JOIN' per includere anche i film che non hanno recensioni.
  let sql = `SELECT movies.*, AVG(reviews.vote) AS avg_vote 
    FROM movies 
    LEFT JOIN reviews ON movies.id = reviews.movie_id 
    GROUP BY movies.id`;

  // Eseguiamo la query al database
  connection.query(sql, (err, movies) => {
    if (err) return res.status(500).json({ message: err.message }); // In caso di errore nella query, restituiamo un errore 500 con il messaggio dell'errore.

    res.json(movies); // Se la query è riuscita, rispondiamo con l'elenco dei film.
  });
}

// Funzione per ottenere i dettagli di un singolo film tramite l'ID
function show(req, res) {
  const id = req.params.id; // Preleviamo l'ID del film dalla richiesta (URL).

  // Scriviamo la query SQL per ottenere i dettagli del film specifico e la media delle recensioni.
  const sql = `SELECT movies.*, AVG(reviews.vote) AS avg_vote 
    FROM movies 
    LEFT JOIN reviews ON movies.id = reviews.movie_id 
    WHERE movies.id = ? 
    GROUP BY movies.id`;

  // Eseguiamo la query, passando l'ID come parametro per cercare il film
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message }); // In caso di errore nella query, restituiamo un errore 500 con il messaggio dell'errore.

    if (results.length === 0) {
      // Se non troviamo nessun film con quell'ID
      return res.status(404).json({
        // Rispondiamo con un errore 404 (Film non trovato)
        error: "Not Found",
        message: "Movie not found",
      });
    }

    const movie = results[0]; // Preleviamo il primo (e unico) risultato della query.
    const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ?`; // Scriviamo una query per ottenere tutte le recensioni per quel film.

    // Eseguiamo la query per ottenere le recensioni del film
    connection.query(reviewsSql, [id], (err, reviews) => {
      if (err) return res.status(500).json({ message: err.message }); // In caso di errore nella query delle recensioni, restituiamo un errore 500.

      movie.reviews = reviews; // Aggiungiamo le recensioni al film.
      res.json(movie); // Rispondiamo con il film e le sue recensioni.
    });
  });
}

// Funzione per aggiungere una recensione a un film
function createReview(req, res) {
  const id = req.params.id; // Otteniamo l'ID del film dal parametro dell'URL.
  const { text, vote, name } = req.body; // Estraiamo il testo della recensione, il voto e il nome dell'autore dalla richiesta.

  const intVote = parseInt(vote); // Convertiamo il voto in un intero.

  // Eseguiamo una validazione dei dati.
  // Verifichiamo che il nome sia una stringa e che non superi i 255 caratteri,
  // e che il voto sia un numero tra 1 e 5.
  if (
    !name ||
    typeof name !== "string" ||
    name.length > 255 ||
    isNaN(intVote) ||
    intVote < 1 ||
    intVote > 5
  ) {
    return res.status(400).json({ message: "Invalid data" }); // Se i dati non sono validi, restituiamo un errore 400 con il messaggio "Invalid data".
  }

  // Scriviamo la query per inserire la recensione nel database.
  const sql =
    "INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)";

  // Eseguiamo la query per aggiungere la recensione nel database
  connection.query(sql, [text, name, intVote, id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message }); // In caso di errore nella query, restituiamo un errore 500 con il messaggio dell'errore.

    res
      .status(201) // Rispondiamo con un codice di stato 201 (Created) per indicare che la recensione è stata aggiunta.
      .json({ message: "Review added", reviewId: results.insertId }); // Rispondiamo con il messaggio di successo e l'ID della recensione inserita.
  });
}

module.exports = { index, show, createReview }; // Esportiamo le funzioni per usarle altrove (es. nel router del nostro server).
