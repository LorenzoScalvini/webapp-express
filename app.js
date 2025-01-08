const express = require("express");
const db = require("./data/db");
const moviesRouter = require("./routes/movies");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/movies", moviesRouter);

// Middleware for non-existent routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
