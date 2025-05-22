import mongoose, { Schema } from "mongoose";
import { ISkill } from "./skill.interface";

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Skill = mongoose.model<ISkill>("Skill", SkillSchema);
