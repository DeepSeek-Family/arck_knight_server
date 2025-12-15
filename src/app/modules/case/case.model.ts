import { model, Schema } from "mongoose";
import { ICase } from "./case.interface";

const caseSchema = new Schema<ICase>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    case_name: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true, 
    },
    case_type: {
      type: String,
      required: true,
    },
    case_location: {
      type: String,
      required: true,
    },
    case_place: {
      type: String,
      enum: ["aerial", "underground"],
      required: true,
    },
    cable_details: [
      {
        tag_name: {
          type: String,
          required: true,
        },
        year: {
          type: String,
          required: true,
        },
        make: {
          type: String,
          required: true,
        },
        selected_date: {
          type: Date,
          required: true,
        },
        foot_age: {
          type: String,
          required: true,
        },
        note: {
          type: String,
          required: false,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Case = model<ICase>("Case", caseSchema);
