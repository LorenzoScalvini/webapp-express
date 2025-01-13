// Middleware per gestire le rotte non trovate
function notFound(req, res, next) {
  res.status(404).json({ error: "Route not found" }); // Rispondiamo con un messaggio di errore 404
}

// Esportiamo il middleware per poterlo usare in altre parti dell'app
module.exports = notFound;
