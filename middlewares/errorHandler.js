// Middleware per gestire gli errori
function errorHandler(err, req, res, next) {
  console.error(err.stack); // Stampiamo lo stack dell'errore per il debug
  res.status(500).json({ error: "Something went wrong" }); // Rispondiamo con un messaggio generico di errore
}

// Esportiamo il middleware per poterlo usare in altre parti dell'app
module.exports = errorHandler;
