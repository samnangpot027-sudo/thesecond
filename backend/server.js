import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/product.route.js";
import connectDB from "./connection/db.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Serve React build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/product", productRouter);

// Fix for Express 5
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

connectDB();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
