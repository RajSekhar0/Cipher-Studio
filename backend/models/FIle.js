import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  projectId:{ type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  parentId:{ type: mongoose.Schema.Types.ObjectId, default:null },
  name:{ type:String, required:true },
  type:{ type:String, enum:["file","folder"], required:true },
  s3Key:{ type:String, default:null },
  content:{ type:String, default:"" }
});

export default mongoose.model("File", fileSchema);
