import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../builder/queryBuilder";
import { User } from "../../user/user.model";
import { IUser } from "../../user/user.interface";

const getAllUserFromDB = async (
  user: JwtPayload,
  query: Record<string, any>
) => {
  // Implementation to get all users from the database
  const qu = new QueryBuilder(User.find().lean(), query)
    .search(["userName", "email"])
    .filter()
    .sort()
    .paginate();
  const [data, meta] = await Promise.all([
    qu.modelQuery.exec(),
    qu.getPaginationInfo(),
  ]);
  return { data: data ? data : [], meta };
};

const banUserFromDB = async (id: string, payload: any, user: JwtPayload) => {
  const userData = await User.findById(id);
  if (!userData) {
    throw new Error("User not found");
  }
  const data = await User.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true }
  ).lean();
  return data;
};

const deleteUserFromDB = async (id: string, user: JwtPayload) => {
  const data = await User.findByIdAndDelete(id).lean();
  return data;
};

const addUserIntoDB = async (payload: IUser, user: JwtPayload) => {
  const data = await User.create(payload);
  return data;
};

export const userManagementService = {
  getAllUserFromDB,
  banUserFromDB,
  deleteUserFromDB,
  addUserIntoDB,
};
