import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required:false },
  name:{ type:String, required:true },
  files:{ type:Object, default:{} },
  createdAt:{ type: Date, default: Date.now }
});

export default mongoose.model("Project", projectSchema);
