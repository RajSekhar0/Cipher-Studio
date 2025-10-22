import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit:"10mb" }));

app.get("/", (req,res)=> res.send("🚀 CipherStudio Backend API is running..."));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/files", fileRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("✅ MongoDB Connected"))
  .catch(err=> console.error("❌ MongoDB Connection Error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`✅ Server running on port ${PORT}`));
