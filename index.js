import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import movieRouter from "./routes/movie.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import userRouter from "./routes/user.routes.js";
import theatreRouter from "./routes/theatre.routes.js";
import authRouter from "./routes/auth.routes.js";
import showRouter from "./routes/show.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

connectToDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.set("debug", true);

app.get("/working", (req, res) => {
  return res.status(200).json({
    success: true,
  });
});
app.use("/mba/api/v1", movieRouter);
app.use("/mba/api/v1", theatreRouter);
app.use("/mba/api/v1", authRouter);
app.use("/mba/api/v1", userRouter);
app.use("/mba/api/v1", bookingRouter);
app.use("/mba/api/v1", showRouter);
app.use("/mba/api/v1", paymentRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
