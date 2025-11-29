import { z } from 'zod'

const createCategoryZodSchema = z.object({
  body: z.object({
    //  project: Types.ObjectId;
    //   case_name: string;
    //   case_type: string;
    //   case_location: string;
    //   case_place: "aerial" | "underground";
    //   tag_name: string;
    //   year: string;
    //   make: string;
    //   selected_date: Date;
    //   foot_age: string;
    //   note: string;
    //   user: Types.ObjectId;
    case_name: z.string({
      required_error: 'Case name is required',
    }),
    case_type: z.string({
      required_error: 'Case type is required',
    }),
    case_location: z.string({
      required_error: 'Case location is required',
    }),
    case_place: z.enum(['aerial', 'underground'], {
      required_error: 'Case place is required',
    }),
    tag_name: z.string({
      required_error: 'Tag name is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    make: z.string({
      required_error: 'Make is required',
    }),
    selected_date: z.string({
      required_error: 'Selected date is required',
    }),
    foot_age: z.string({
      required_error: 'Foot age is required',
    }),
    note: z.string({
      required_error: 'Note is required',
    })
  }),
})

const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional()
  }),
})

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
}
