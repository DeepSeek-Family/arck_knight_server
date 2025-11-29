import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { caseService } from "./case.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/sendResponse";
import { ICase } from "./case.interface";

const createCase = catchAsync(async (req: Request, res: Response) => {
  const caseData = await caseService.createCaseIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Case created successfully",
    data: caseData,
  });
});

const getAllCases = catchAsync(async (req: Request, res: Response) => {
  const cases = await caseService.getAllCasesFromDB(
    req.user,
    req.query,
    req.params.projectId
  );
  sendResponse<ICase[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cases retrieved successfully",
    pagination: cases.meta,
    data: cases.data,
  });
});
const getSingleCase = catchAsync(async (req: Request, res: Response) => {
  const caseData = await caseService.getSingleCaseFromDB(req.params.id);
  sendResponse<ICase>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Case retrieved successfully",
    data: caseData,
  });
});

const updateCase = catchAsync(async (req: Request, res: Response) => {
  const caseData = await caseService.updateCaseIntoDB(req.params.id, req.body);
  sendResponse<ICase>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Case updated successfully",
    data: caseData,
  });
});
const deleteCase = catchAsync(async (req: Request, res: Response) => {
  const caseData = await caseService.deleteCaseFromDB(req.params.id);
  sendResponse<ICase>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Case deleted successfully",
    data: caseData,
  });
});

const caseHistory = catchAsync(async (req: Request, res: Response) => {
  const history = await caseService.caseHistoryFromDB(req.query, req.user);
  sendResponse<ICase[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Case history retrieved successfully",
    pagination: history.meta,
    data: history.data,
  });
});

export const caseController = {
  createCase,
  getAllCases,
  getSingleCase,
  updateCase,
  deleteCase,
  caseHistory,
};
