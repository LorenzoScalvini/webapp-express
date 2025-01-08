import express from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/movies.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middleware per gestire il body della richiesta (parsing di JSON)
app.use(express.json());

// Rotte per i film
app.use("/api", movieRoutes);

// Middleware per la gestione degli errori
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server sulla porta ${PORT}`);
});
