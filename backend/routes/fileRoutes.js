import express from "express";
import File from "../models/File.js";
const router = express.Router();

router.post("/", async (req,res)=>{
  try{ const f = new File(req.body); await f.save(); res.status(201).json(f); }catch(err){ res.status(500).json({ error:err.message }); }
});
router.get("/:id", async (req,res)=>{ try{ const f = await File.findById(req.params.id); res.json(f); }catch(err){ res.status(500).json({ error:err.message }); }});
router.put("/:id", async (req,res)=>{ try{ const f = await File.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json(f); }catch(err){ res.status(500).json({ error:err.message }); }});
router.delete("/:id", async (req,res)=>{ try{ await File.findByIdAndDelete(req.params.id); res.json({message:"Deleted"}); }catch(err){ res.status(500).json({ error:err.message }); }});

export default router;
