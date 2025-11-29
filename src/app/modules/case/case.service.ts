import { JwtPayload } from "jsonwebtoken";
import { ICase } from "./case.interface";
import { Case } from "./case.model";
import QueryBuilder from "../../builder/queryBuilder";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { ProjectModel } from "../project/project.model";

const createCaseIntoDB = async (payload: Partial<ICase>, user: JwtPayload) => {
  payload.user = user.id;
  if (payload.project && typeof payload.project === "string") {
    const projectDoc = await ProjectModel.findOne({ name: payload.project });

    if (!projectDoc) {
      throw new ApiError(404, "Project not found by name");
    }
    // @ts-ignore
    payload.project = projectDoc._id;
  }

  const result = await Case.create(payload);
  return result;
};

// const getAllCasesFromDB = async (
//   user: JwtPayload,
//   query: Record<string, unknown>,
//   projectId: string
// ) => {
//   const result = new QueryBuilder<ICase>(
//     Case.find({ user: user.id, project: projectId }),
//     query
//   )
//     .search(["case_name", "tag_name"])
//     .sort()
//     .filter()
//     .paginate()
//     .populate(["project"], { project: "name user" });
//   const [data, meta] = await Promise.all([
//     result.modelQuery.exec(),
//     result.getPaginationInfo(),
//   ]);
//   return {
//     meta,
//     data: data ? data : [],
//   };
// };
const getAllCasesFromDB = async (
  user: JwtPayload,
  query: Record<string, unknown>,
  projectId: string
) => {
  const searchTerm = query.searchTerm as string;

  const baseQuery: any = {
    user: user.id,
  };

  if (projectId) {
    baseQuery.project = projectId;
  }
  if (searchTerm) {
    baseQuery.$or = [
      { case_name: { $regex: searchTerm, $options: "i" } },
      { case_type: { $regex: searchTerm, $options: "i" } },
      { case_location: { $regex: searchTerm, $options: "i" } },
      { "project.name": { $regex: searchTerm, $options: "i" } },
    ];
  }

  const result = new QueryBuilder<ICase>(
    Case.find(baseQuery).populate({
      path: "project",
      select: "name user",
    }),
    query
  )
    .sort()
    .filter()
    .paginate();

  const [data, meta] = await Promise.all([
    result.modelQuery.exec(),
    result.getPaginationInfo(),
  ]);

  return {
    meta,
    data: data ?? [],
  };
};

const getSingleCaseFromDB = async (id: string) => {
  const result = await Case.findById(id).lean().exec();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Case not found");
  }
  return result;
};

const updateCaseIntoDB = async (id: string, data: Partial<ICase>) => {
  const result = await Case.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Case not found");
  }
  return result;
};
const deleteCaseFromDB = async (id: string) => {
  const result = await Case.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Case not found");
  }
  return result;
};

const caseHistoryFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload
) => {
  // to be implemented
  const qb = new QueryBuilder<ICase>(Case.find({ user: user.id }), query)
    .search(["case_name", "tag_name"])
    .sort()
    .filter()
    .paginate();
  const [data, meta] = await Promise.all([
    qb.modelQuery.exec(),
    qb.getPaginationInfo(),
  ]);
  return {
    meta,
    data: data ? data : [],
  };
};

export const caseService = {
  createCaseIntoDB,
  getAllCasesFromDB,
  getSingleCaseFromDB,
  updateCaseIntoDB,
  deleteCaseFromDB,
  caseHistoryFromDB,
};
