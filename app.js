const express = require("express");
const path = require("path");
const moviesRouter = require("./routes/movies");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware per CORS e parsing JSON
app.use(cors());
app.use(express.json());

// Servire file statici dalla cartella public
app.use("/public", express.static(path.join(__dirname, "public")));

// Rotta per movies
app.use("/movies", moviesRouter);

// Middleware per gestire 404 e errori
app.use(notFound);
app.use(errorHandler);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
