const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");

const app = express();

// Load environment variables from .env file
dotenv.config();

// Set up mongoose connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => {
    console.log("Error connecting to the database:", e.message);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

// Set up the server to listen on the specified port or default to 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
