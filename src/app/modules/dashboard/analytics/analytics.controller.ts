import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { analyticsService } from "./analytics.service";
import sendResponse from "../../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const totalUserTotalCaseAndTotalProject = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await analyticsService.totalUserTotalCaseAndTotalProjectFromDB();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "analytics retived successfully",
      data: result,
    });
  }
);

const totalRecentProject = catchAsync(async (req: Request, res: Response) => {
  const result = await analyticsService.totalRecentProject();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "recent projects retived successfully",
    data: result,
  });
});
export const analyticsController = {
  totalUserTotalCaseAndTotalProject,
  totalRecentProject,
};