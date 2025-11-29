import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { caseManagementService } from "./caseManagement.service";
import sendResponse from "../../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getCaseManagement = catchAsync(async (req: Request, res: Response) => {
    const result = await caseManagementService.caseManagementFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "case management retrieve success",
        pagination: result.meta,
        data: result.data
    })
})


const getSingleCase = catchAsync(async (req: Request, res: Response) => {
    const result = await caseManagementService.getSingleCaseByIdFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "case management retrieve success",
        data: result
    })
})
const deleteCase = catchAsync(async (req: Request, res: Response) => {
    const result = await caseManagementService.deleteCaseFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "case management delete success",
        data: result
    })
})


const updateCaseData = catchAsync(async (req: Request, res: Response) => {
    const result = await caseManagementService.updateCaseDataIntoDB(req.params.id, req.body, req.user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "case management update success",
        data: result
    })
})


const getCaseById = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
    const result = await caseManagementService.getCaseByIdFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "case management retrieve success",
        data: result
    })
})


const deleteProject = catchAsync(async (req: Request, res: Response) => {
    const result = await caseManagementService.deleteProjectFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "project delete success",
        data: result
    })
})

export const caseManagementController = {
    getCaseManagement,
    getSingleCase,
    deleteCase,
    updateCaseData,
    getCaseById,
    deleteProject
}
