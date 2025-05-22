import { ISkill } from "./skill.interface";
import { Skill } from "./skill.model";

const addSkillIntoDB = async (payload: Partial<ISkill>) => {
  const result = await Skill.create(payload);
  return result;
};

const getAllSkillFromDB = async () => {
  const result = await Skill.find({});
  return result;
};

const getSkillByIdFromDB = async (id: string) => {
  const result = await Skill.findById(id);
  return result;
};

const updateSkillIntoDB = async (id: string, data: Partial<ISkill>) => {
  const skill = await Skill.findById(id);
  if (!skill) throw new Error("Skill not found");

  const result = await Skill.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteSkillFromDB = async (id: string) => {
  const skill = await Skill.findById(id);
  if (!skill) throw new Error("Skill not found");

  const result = await Skill.findByIdAndDelete(id);
  return result;
};

export const SkillsService = {
  addSkillIntoDB,
  getAllSkillFromDB,
  getSkillByIdFromDB,
  updateSkillIntoDB,
  deleteSkillFromDB,
};
