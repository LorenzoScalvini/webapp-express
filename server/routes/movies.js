import express from "express";
import { getMovies, getMovie } from "../controllers/moviesController.js";

const router = express.Router();

// Rotta per ottenere la lista dei film
router.get("/movies", getMovies);

// Rotta per ottenere i dettagli di un singolo film
router.get("/movies/:id", getMovie);

export default router;
