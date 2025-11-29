import { JwtPayload } from "jsonwebtoken";
import { IRule } from "./rule.interface";
import { Rule } from "./rule.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import { USER_ROLES } from "../../../enums/user";


const allowedTypes = ["privacy", "terms", "about"];

const validateType = (types: string) => {
    if (!allowedTypes.includes(types)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid type provided");
    }
};
const createRuleToDB = async (payload: IRule, user: JwtPayload) => {
    const userDetails = await User.findById(user.id).select("role").lean().exec();
    if (userDetails?.role !== USER_ROLES.SUPER_ADMIN) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Your are authorized to perform this action");
    }
    validateType(payload.type);
    const result = await Rule.findOneAndUpdate({ type: payload.type }, payload, {
        new: true,
        upsert: true,
    });

    return result;
};


const getRuleFromDB = async (type: string) => {
    validateType(type);
    const result = await Rule.findOne({ type: type });
    if (!result) {
        return [];
    }
    return result;
};

export const RuleService = {
    createRuleToDB,
    getRuleFromDB,
};
