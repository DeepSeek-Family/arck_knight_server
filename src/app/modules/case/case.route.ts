import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { caseController } from "./case.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidation } from "./case.validation";

const router = Router();

router
  .route("/")
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    //  validateRequest(CategoryValidation.createCategoryZodSchema),
    caseController.createCase
  )
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    caseController.caseHistory
  );

router
  .route("/project/:projectId")
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    caseController.getAllCases
  );

router
  .route("/:id")
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    caseController.getSingleCase
  )
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    // validateRequest(CategoryValidation.updateCategoryZodSchema),
    caseController.updateCase
  )
  .delete(auth(USER_ROLES.SUPER_ADMIN), caseController.deleteCase);

export const caseRoutes = router;
