import { JwtPayload } from "jsonwebtoken";
import { IProject } from "./project.interface";
import { ProjectModel } from "./project.model";
import QueryBuilder from "../../builder/queryBuilder";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

const createProjectIntoDB = async (user: JwtPayload, data: IProject) => {
    data.user = user.id;
    const result = await ProjectModel.create(data);
    return result;
}


const getAllProjectsFromDB = async (user: JwtPayload, query: Record<string, unknown>) => {
    const result = new QueryBuilder<IProject>(ProjectModel.find({ user: user.id }), query)
        .search(['name'])
        .sort()
        .filter()
        .paginate();
    const [data, meta] = await Promise.all([
        result.modelQuery.exec(),
        result.getPaginationInfo(),
    ])
    return {
        data, meta
    }

}
const getSingleProjectFromDB = async (id: string) => {
    const result = await ProjectModel.findById(id);
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Project not found");
    }
    return result;
}



const updateProjectIntoDB = async (id: string, data: Partial<IProject>) => {
    const result = await ProjectModel.findByIdAndUpdate(id
        , data, { new: true });
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Project not found");
    }
    return result;
}


const deleteProjectFromDB = async (id: string) => {
    const result = await ProjectModel.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Project not found");
    }
    return result;
}


export const projectService = {
    createProjectIntoDB,
    getAllProjectsFromDB,
    getSingleProjectFromDB,
    updateProjectIntoDB,
    deleteProjectFromDB,
};