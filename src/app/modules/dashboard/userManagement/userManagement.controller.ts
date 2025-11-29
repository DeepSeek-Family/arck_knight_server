import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { userManagementService } from "./userManagement.service";

const getAllUser = catchAsync(async (req, res) => {
  const result = await userManagementService.getAllUserFromDB(
    req.user,
    req.query
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users retrieved successfully",
    pagination: result.meta,
    data: result.data,
  });
});

const banUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userManagementService.banUserFromDB(id, req.body, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User banned successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userManagementService.deleteUserFromDB(id, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});
const addUser = catchAsync(async (req, res) => {
  const result = await userManagementService.addUserIntoDB(req.body, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User added successfully",
    data: result,
  });
});


export const userManagementController = {
  getAllUser,
  banUser,
  deleteUser,
  addUser,
};
