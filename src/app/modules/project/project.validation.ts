import z from "zod";

const createProjectSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Project name is required",
        }).min(3, "Project name must be at least 3 characters long"),
    }),
});



const updateProjectSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Project name must be at least 3 characters long").optional(),
    }),
});


export const projectValidation = {
    createProjectSchema,
    updateProjectSchema,
};