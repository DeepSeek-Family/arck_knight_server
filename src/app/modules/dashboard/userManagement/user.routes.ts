import { Router } from "express";
import auth from "../../../middlewares/auth";
import { USER_ROLES } from "../../../../enums/user";
import { userManagementController } from "./userManagement.controller";

const router = Router();

router
  .route("/users")
  .get(auth(USER_ROLES.SUPER_ADMIN), userManagementController.getAllUser)
  .post(auth(USER_ROLES.SUPER_ADMIN), userManagementController.addUser)

//   Ban a user
router
  .route("/users/:id")
  .patch(auth(USER_ROLES.SUPER_ADMIN), userManagementController.banUser)
  .delete(auth(USER_ROLES.SUPER_ADMIN), userManagementController.deleteUser);




export const userManagementRoutes = router;
