const express = require("express");
const moviesRouter = require("./routes/movies");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/movies", moviesRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
