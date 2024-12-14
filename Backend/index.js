import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/db/db.js";
import userRouter from './src/routes/user.route.js'
import companyRouter from './src/routes/company.route.js'
import jobRouter from './src/routes/job.route.js'
import applicationRouter from './src/routes/applicationRoute.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true, // Fixed typo
  methods: ["POST", "GET", "PUT", "DELETE"], // Changed "method" to "methods"
};
app.use(cors(corsOption));
app.use(cookieParser());

// middlewares apis
app.use("/api/v1/user", userRouter);
app.use('/api/v1/company',companyRouter)
app.use('/api/v1/job',jobRouter)
app.use('/api/v1/application',applicationRouter)

connectDB();
app.listen(PORT, () => {
  console.log(`The server is liston ${PORT} port`);
});
