import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";

dotenv.config();

connectToDB();
const app = express();

app.use(express.json());

app.get("/working", (req, res) => {
  return res.status(200).json({
    success: true,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
