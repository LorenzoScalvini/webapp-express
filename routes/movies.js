const express = require("express"); // Importa Express
const router = express.Router(); // Crea un router
const moviesController = require("../controllers/moviesController"); // Controller dei film

// Ottieni tutti i film
router.get("/", moviesController.index);

// Ottieni un singolo film tramite ID
router.get("/:id", moviesController.show);

// Aggiungi una recensione a un film
router.post("/:id/reviews", moviesController.createReview);

module.exports = router;
