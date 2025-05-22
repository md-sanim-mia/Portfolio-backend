import httpStatus from "http-status";
import { asyncCatch } from "../../utilitys/async.catch";
import sendResponse from "../../utilitys/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { SkillsService } from "./skill.service";

const addSkill = asyncCatch(async (req, res) => {
  const file = req.file;
  if (!file) {
    throw new Error("Image file is required");
  }
  const skillData = { ...req.body, image: file.path };
  const result = await SkillsService.addSkillIntoDB(skillData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Skill added successfully",
    data: result,
  });
});

const getAllSkill = asyncCatch(async (req, res) => {
  const result = await SkillsService.getAllSkillFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skills retrieved successfully",
    data: result,
  });
});

const getSkillById = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await SkillsService.getSkillByIdFromDB(id);

  if (!result) {
    throw new Error("Skill not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill retrieved successfully",
    data: result,
  });
});

//update skill
const updateSkill = asyncCatch(async (req, res) => {
  const file = req.file;
  if (!file) {
    throw new Error("Image file is required");
  }
  const skillData = { ...req.body, image: file.path };
  const { id } = req.params;

  // check skill exists
  const skill = await SkillsService.getSkillByIdFromDB(id);
  if (!skill) {
    throw new Error("Skill not found");
  }

  const result = await SkillsService.updateSkillIntoDB(id, skillData);

  console.log("Updated skill in DB:", result);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill updated successfully",
    data: result,
  });
});

const deleteSkill = asyncCatch(async (req, res) => {
  const { id } = req.params;

  // check user is admin
  const user = req.user as JwtPayload;
  if (user.role !== "admin") {
    throw new Error("You are not authorized to delete this skill");
  }

  // check project exists
  const skill = await SkillsService.getSkillByIdFromDB(id);
  if (!skill) {
    throw new Error("Skill not found");
  }

  await SkillsService.deleteSkillFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill deleted successfully",
    data: null,
  });
});

export const SkillsController = {
  addSkill,
  getAllSkill,
  getSkillById,
  updateSkill,
  deleteSkill,
};
