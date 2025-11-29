import moment from "moment";
import { User } from "../../user/user.model";
import { ProjectModel } from "../../project/project.model";
import { Case } from "../../case/case.model";

const totalUserTotalCaseAndTotalProjectFromDB = async () => {
  const startOfWeek = moment().startOf("week").toDate();
  const endOfWeek = moment().endOf("week").toDate();

  // ===== Total Counts =====
  const totalUser = await User.find({ verified: true }).countDocuments();
  const totalProject = await ProjectModel.find().countDocuments();
  const totalCase = await Case.find().countDocuments();

  // ===== Weekly Counts =====
  const weeklyUser = await User.find({
    verified: true,
    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
  }).countDocuments();

  const weeklyProject = await ProjectModel.find({
    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
  }).countDocuments();

  const weeklyCase = await Case.find({
    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
  }).countDocuments();

  // ===== RETURN ARRAY FORM =====
  return [
    {
      title: "Total Users",
      value: totalUser,
      newThisWeek: weeklyUser,
      icon: "users",
      color: "from-yellow-400 to-amber-500",
      link: "/user-management"
    },
    {
      title: "Total Projects",
      value: totalProject,
      newThisWeek: weeklyProject,
      icon: "projects",
      color: "from-blue-400 to-indigo-500",
      link: "/case-management"
    },
    {
      title: "Total Cases",
      value: totalCase,
      newThisWeek: weeklyCase,
      icon: "cases",
      color: "from-orange-400 to-orange-500",
      link: "/case-management"
    },
  ];
};


const totalRecentProject = async () => {
  const result = await ProjectModel.find().sort({ createdAt: -1 }).limit(5).populate({
    path: "user",
    select: "name email",
  });

  return result ? result : [];
};

export const analyticsService = {
  totalUserTotalCaseAndTotalProjectFromDB,
  totalRecentProject,
};
