import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import movieRouter from "./routes/movie.routes.js";
import theatreRouter from "./routes/theatre.routes.js";
import mongoose from "mongoose";

dotenv.config();

connectToDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("debug", true);

app.get("/working", (req, res) => {
  return res.status(200).json({
    success: true,
  });
});
app.use("/mba/api/v1", movieRouter);
app.use("/mba/api/v1", theatreRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
