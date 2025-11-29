import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../builder/queryBuilder";
import { ICase } from "../../case/case.interface";
import { Case } from "../../case/case.model";
import { User } from "../../user/user.model";
import { USER_ROLES } from "../../../../enums/user";
import ApiError from "../../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { ProjectModel } from "../../project/project.model";

const caseManagementFromDB = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(ProjectModel.find(), query)
    .search([])
    .sort()
    .filter()
    .fields();
  const data = await result.modelQuery;
  const meta = await result.getPaginationInfo();
  return {
    data,
    meta,
  };
};

const getCaseByIdFromDB = async (id: string) => {
  return await Case.find({ project: id }).populate({
    path: "project",
    select: "project_name",
  }); 
};


const getSingleCaseByIdFromDB = async (id: string) => {
  const result = await Case.findById({ _id: id });
  return result;
};

const deleteCaseFromDB = async (id: string) => {
  const result = await Case.findByIdAndDelete(id);
  return result;
};

const updateCaseDataIntoDB = async (
  id: string,
  payload: ICase,
  user: JwtPayload
) => {
  const superAdmin = await User.findOne({ _id: user.id, role: USER_ROLES.SUPER_ADMIN });
  if (!superAdmin) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }
  const result = await Case.findByIdAndUpdate(id, payload, { new: true });
  return result;
};


// 
const deleteProjectFromDB = async (id: string) => {
  const result = await ProjectModel.findByIdAndDelete(id);
  return result;
};

export const caseManagementService = {
  caseManagementFromDB,
  getSingleCaseByIdFromDB,
  deleteCaseFromDB,
  updateCaseDataIntoDB,
  getCaseByIdFromDB,
  deleteProjectFromDB
};
