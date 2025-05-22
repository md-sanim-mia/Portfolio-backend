import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProjectIntoDB = async (payload: IProject) => {
  const result = await Project.create(payload);
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find({});
  return result;
};

const getProjectByIdFromDB = async (id: string) => {
  const result = await Project.findById(id);
  return result;
};

// update project into db
const updateProjectIntoDB = async (id: string, data: Partial<IProject>) => {
  const result = await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete project into db
const deleteProjectFromDB = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  return result;
};

export const ProjectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
};
