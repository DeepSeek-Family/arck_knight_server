import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { projectController } from "./project.controller";
import validateRequest from "../../middlewares/validateRequest";
import { projectValidation } from "./project.validation";

const router = Router();


router.route("/")
    .post(validateRequest(projectValidation.createProjectSchema), auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.USER), projectController.createProject)
    .get(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.USER), projectController.getAllProjects);


router.route("/:id")
    .get(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.USER), projectController.getSingleProject)
    .patch(validateRequest(projectValidation.updateProjectSchema), auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.USER), projectController.updateProject)
    .delete(auth(USER_ROLES.SUPER_ADMIN), projectController.deleteProject);

export const projectRoutes = router;