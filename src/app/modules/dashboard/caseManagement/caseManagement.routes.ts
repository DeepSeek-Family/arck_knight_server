import { Router } from "express";
import auth from "../../../middlewares/auth";
import { USER_ROLES } from "../../../../enums/user";
import { caseManagementController } from "./caseManagement.controller";
const router = Router();
router.route("/management")
    .get(auth(USER_ROLES.SUPER_ADMIN), caseManagementController.getCaseManagement)


router.route("/management/:id")
    .get(auth(USER_ROLES.SUPER_ADMIN), caseManagementController.getSingleCase)
    .patch(auth(USER_ROLES.SUPER_ADMIN), caseManagementController.updateCaseData)
    .delete(auth(USER_ROLES.SUPER_ADMIN), caseManagementController.deleteCase)

router.route("/management/case/:id")
    .get(auth(USER_ROLES.SUPER_ADMIN), caseManagementController.getCaseById)

router.route("/management/project/:id")
    .delete(auth(USER_ROLES.SUPER_ADMIN), caseManagementController.deleteProject)


export const caseManagementRoutes = router;