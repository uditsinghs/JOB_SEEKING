import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/db/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOption = {
  origin: "http://localhost:5173",
  crendentials: true,
  method: ["POST", "GET", "PUT", "DELETE"],
};
app.use(cors(corsOption));
app.use(cookieParser());
connectDB();
app.listen(PORT, () => {
  console.log(`The server is liston ${PORT} port`);
});
