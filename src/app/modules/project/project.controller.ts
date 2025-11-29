import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IProject } from "./project.interface";
import { projectService } from "./project.service";
import { Request, Response } from "express";

const createProject = catchAsync(async (req: Request, res: Response) => {
    const project = await projectService.createProjectIntoDB(req.user, req.body);

    sendResponse<IProject>(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Project created successfully",
        data: project,
    });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const projects = await projectService.getAllProjectsFromDB(req.user, req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Projects retrieved successfully",
        pagination: projects.meta,
        data: projects.data,
    });
});


const getSingleProject = catchAsync(async (req: Request, res: Response) => {
    const project = await projectService.getSingleProjectFromDB(req.params.id);

    sendResponse<IProject>(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Project retrieved successfully",
        data: project,
    });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
    const project = await projectService.updateProjectIntoDB(req.params.id, req.body);
    sendResponse<IProject>(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Project updated successfully",
        data: project,
    });
}
);

const deleteProject = catchAsync(async (req: Request, res: Response) => {
    const project = await projectService.deleteProjectFromDB(req.params.id);
    sendResponse<IProject>(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Project deleted successfully",
        data: project,
    });
});

export const projectController = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
};
