import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// create
router.post("/", async (req,res)=>{
  try{
    const { name, files, userId } = req.body;
    if(!name) return res.status(400).json({ error:"Name required" });
    const p = new Project({ name, files: files || {}, userId: userId || null });
    await p.save();
    res.status(201).json(p);
  }catch(err){ res.status(500).json({ error:err.message }); }
});

// get all (optionally filter by userId query param)
router.get("/", async (req,res)=>{
  try{
    const list = await Project.find().sort({ createdAt:-1 });
    res.json(list);
  }catch(err){ res.status(500).json({ error:err.message }); }
});

// view single
router.get("/view/:id", async (req,res)=>{
  try{
    const p = await Project.findById(req.params.id);
    if(!p) return res.status(404).json({ error:"Not found" });
    res.json(p);
  }catch(err){ res.status(500).json({ error:err.message }); }
});

// update
router.put("/:id", async (req,res)=>{
  try{
    const upd = await Project.findByIdAndUpdate(req.params.id, req.body, { new:true });
    res.json(upd);
  }catch(err){ res.status(500).json({ error:err.message }); }
});

// delete
router.delete("/:id", async (req,res)=>{
  try{
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message:"Deleted" });
  }catch(err){ res.status(500).json({ error:err.message }); }
});

export default router;
