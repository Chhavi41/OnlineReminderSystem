import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes";
import "./cron/reminderJob"; // side-effect to schedule the job


const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

connectDB()
  .then(() => {
    console.log("connected to DB");
    app.listen(port, () => console.log("Listening on port " + port));
  })
  .catch((err: unknown) => {
    console.error("Error connecting to DB", err);
    process.exit(1);
  });

  // luffy@OnePiece367