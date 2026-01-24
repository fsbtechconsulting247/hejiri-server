import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "healthy",
  });
});

app.listen(4004, () => {
  console.log("Server is running on port 4004 in development environment.");
  connectToDatabase();
});
