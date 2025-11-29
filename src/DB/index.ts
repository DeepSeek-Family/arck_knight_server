import colors from "colors";
import { User } from "../app/modules/user/user.model";
import { USER_ROLES } from "../enums/user";
import { logger } from "../shared/logger";
import { config } from "../config";

const superUser = {
  name: "Super Admin",
  role: USER_ROLES.SUPER_ADMIN,
  email: config.superAdmin.email,
  password: config.superAdmin.password,
  confirmPassword: config.superAdmin.confirmPassword,
  verified: true,
};

const seedSuperAdmin = async () => {
  const isExistSuperAdmin = await User.findOne({
    role: USER_ROLES.SUPER_ADMIN,
  });

  if (!isExistSuperAdmin) {
    await User.create(superUser);
    logger.info(colors.green("✔ Super admin created successfully!"));
  }
};

export default seedSuperAdmin;
