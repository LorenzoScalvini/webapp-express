const mysql = require("mysql2"); // Importiamo il pacchetto mysql2 per connetterci al database
require("dotenv").config(); // Carichiamo le variabili d'ambiente da un file .env

// Creiamo la connessione al database usando le variabili d'ambiente
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Host del database (ad esempio localhost)
  user: process.env.DB_USER, // Utente del database
  password: process.env.DB_PASSWORD, // Password del database
  database: process.env.DB_NAME, // Nome del database
});

// Esportiamo la connessione per poterla usare in altre parti dell'app
module.exports = connection;
