import { Types } from "mongoose";

export interface IProject {
    _id?: string;
    name: string;
    user: Types.ObjectId;
    cases?: Types.ObjectId[];
}