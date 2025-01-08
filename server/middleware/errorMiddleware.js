export const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Qualcosa e' andato storto" });
};
