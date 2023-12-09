import express from "express";
import cors from "cors";
import connectDB from "./config/mongoConnection.js";
import setCitiesDB from "./config/setCitiesDB.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import WeatherAppRouter from "./routes/WeatherAppRouter.js";
import NotFoundRouter from "./routes/NotFoundRouter.js";
import ApiKeyRouter from "./routes/ApiKeyRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/", WeatherAppRouter);
app.use("/not-found", NotFoundRouter);
app.use("/api/proxy", ApiKeyRouter);

mongoose.connection.once("open", () => {
  console.log("Connection to MongoDB = GOOD");
  setCitiesDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
