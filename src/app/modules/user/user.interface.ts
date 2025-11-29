import { Model, Types } from "mongoose";
import { USER_ROLES } from "../../../enums/user";

interface IAuthenticationProps {
  isResetPassword: boolean;
  oneTimeCode: number;
  expireAt: Date;
}

export type IUser = {
  name: string;
  email: string;
  contact: string;
  role: USER_ROLES;
  password: string;
  confirmPassword: string;
  appId?: string;
  location: string;
  isDeleted:boolean;
  isBanned:boolean;
  image: string;
  verified: boolean;
  authentication?: IAuthenticationProps;
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isAccountCreated(id: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
