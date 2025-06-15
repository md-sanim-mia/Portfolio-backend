import exress from "express";
import { authRouters } from "../modules/auth/auth.router";
import { ProjectRoutes } from "../modules/Project/project.route";
import { blogRouter } from "../modules/Blog/blog.route";
import { SkillsRoutes } from "../modules/Skills/skill.route";

const router = exress.Router();

const moduleRouters = [
  {
    path: "/auth",
    route: authRouters,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/blogs",
    route: blogRouter,
  },
  {
    path: "/skills",
    route: SkillsRoutes,
  },
];

moduleRouters.forEach((item) => router.use(item.path, item.route));

export default router;
