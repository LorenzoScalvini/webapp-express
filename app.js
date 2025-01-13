const express = require("express"); // Importa Express
const path = require("path"); // Gestione dei percorsi dei file
const moviesRouter = require("./routes/movies"); // Router per le rotte dei film
const notFound = require("./middlewares/notFound"); // Middleware per 404
const errorHandler = require("./middlewares/errorHandler"); // Middleware per errori generali
const cors = require("cors"); // Middleware CORS per origini diverse

const app = express(); // Inizializza l'app Express
const PORT = 3000; // Porta del server

// Middleware globali
app.use(cors()); // Abilita CORS
app.use(express.json()); // Parso delle richieste in formato JSON

// Servire file statici (per esempio immagini o file pubblici)
app.use("/public", express.static(path.join(__dirname, "public")));

// Rotte
app.use("/movies", moviesRouter); // Associa il router `movies` alle rotte che iniziano con "/movies"

// Middleware per gestire 404 e errori generali
app.use(notFound); // Rotta non trovata
app.use(errorHandler); // Gestione degli errori generali

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
