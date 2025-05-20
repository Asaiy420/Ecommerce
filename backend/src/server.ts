import express from "express";
import "dotenv/config";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
  connectDB();
});
