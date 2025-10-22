import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "cipherstudio_secret";

// register
router.post("/register", async (req,res)=>{
  try{
    const { username, email, password } = req.body;
    if(!username||!email||!password) return res.status(400).json({ error:"Missing fields" });
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ error:"Email already used" });
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message:"Registered", user:{ _id:user._id, username:user.username, email:user.email } });
  }catch(err){ res.status(500).json({ error:err.message }); }
});

// login
router.post("/login", async (req,res)=>{
  try{
    const { email, password } = req.body;
    if(!email||!password) return res.status(400).json({ error:"Missing credentials" });
    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({ error:"Invalid credentials" });
    const match = await user.matchPassword(password);
    if(!match) return res.status(401).json({ error:"Invalid credentials" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn:"7d" });
    res.json({ token, user:{ _id:user._id, username:user.username, email:user.email } });
  }catch(err){ res.status(500).json({ error:err.message }); }
});

export default router;
