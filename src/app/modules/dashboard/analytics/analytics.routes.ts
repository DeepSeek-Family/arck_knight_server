import { Router } from "express";
import auth from "../../../middlewares/auth";
import { USER_ROLES } from "../../../../enums/user";
import { analyticsController } from "./analytics.controller";

const router = Router();
router
  .route("/case")
  .get(
    auth(USER_ROLES.SUPER_ADMIN),
    analyticsController.totalUserTotalCaseAndTotalProject
  );

router
  .route("/recent-projects")
  .get(auth(USER_ROLES.SUPER_ADMIN), analyticsController.totalRecentProject);


  export const analyticsRoutes = router;