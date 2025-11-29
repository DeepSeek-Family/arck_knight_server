import { model, Schema } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
})

export const ProjectModel = model<IProject>("Project", projectSchema);