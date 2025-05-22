import mongoose, { Schema, model } from "mongoose";
import { IProject } from "./project.interface";
// adjust path as needed

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    completionDate: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    images: [{ type: String, required: true }],
    github: { type: String, required: true },
    live: { type: String, required: true },
    features: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    challenges: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        solution: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);
