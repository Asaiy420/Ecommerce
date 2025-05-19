import express from "express";
import "dotenv/config";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import { connectDB } from "./config/db";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

