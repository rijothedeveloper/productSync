import exp from "constants";
import express from "express";

// Create an Express application
const app = express();

// Define a route for the root path ('/')
app.get("/", (req, res) => {
  // Send a response to the client
  res.send("Hello, TypeScript + Node.js + Express!");
});

export default app;
