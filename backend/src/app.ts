import express from "express";
import logger from "morgan";
import authRoutes from "./routes/authentication.routes";

// Create an Express application
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

// Define a route for the root path ('/')
app.get("/", (req, res) => {
  // Send a response to the client
  res.send("Hello, TypeScript + Node.js + Express!");
});

app.use("/auth", authRoutes);

export default app;
