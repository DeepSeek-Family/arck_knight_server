import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RuleService } from "./rule.service";
import { JwtPayload } from "jsonwebtoken";

const createRule = catchAsync(async (req: Request, res: Response) => {
    const { ...ruleData } = req.body;
    const result = await RuleService.createRuleToDB(ruleData, req.user as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `${ruleData.type} created successfully`,
        data: result,
    });
});

const getRule = catchAsync(async (req: Request, res: Response) => {
    const result = await RuleService.getRuleFromDB(req.params.type);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `${req.params.type} retrieved successfully`,
        data: result,
    });
});

export const RuleController = {
    createRule,
    getRule,
};
