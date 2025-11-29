import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { projectRoutes } from "../modules/project/project.routes";
import { caseRoutes } from "../modules/case/case.route";
import { RuleRoutes } from "../modules/rule/rule.route";
import { userManagementRoutes } from "../modules/dashboard/userManagement/user.routes";
import { analyticsRoutes } from "../modules/dashboard/analytics/analytics.routes";
import { caseManagementRoutes } from "../modules/dashboard/caseManagement/caseManagement.routes";
const router = express.Router();

const apiRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/projects", route: projectRoutes },
  { path: "/case", route: caseRoutes },
  { path: "/rule", route: RuleRoutes },
  { path: "/dashboard", route: userManagementRoutes },
  { path: "/dashboard/user", route: analyticsRoutes },
  { path: "/dashboard/case", route: caseManagementRoutes },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
