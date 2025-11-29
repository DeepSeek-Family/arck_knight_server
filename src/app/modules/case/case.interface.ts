import { Types } from "mongoose";

export interface cableDetails {
  tag_name: string;
  year: string;
  make: string;
  selected_date: Date;
  foot_age: string;
  note?: string;
}

export type ICase = {
  project: Types.ObjectId;
  case_name: string;
  case_type: string;
  case_location: string;
  case_place: "aerial" | "underground";
  cable_details: cableDetails[];
  user: Types.ObjectId;
};
