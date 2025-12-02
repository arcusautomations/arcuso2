import { z } from "zod";

/**
 * Project status enum
 */
export const projectStatusEnum = z.enum(["active", "completed", "archived"]);

/**
 * Create project schema
 */
export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must be less than 100 characters")
    .trim(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .nullable(),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;

/**
 * Update project schema
 */
export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must be less than 100 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .nullable(),
  status: projectStatusEnum.optional(),
});

export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;

/**
 * Project filter schema
 */
export const projectFilterSchema = z.object({
  status: projectStatusEnum.optional(),
  search: z.string().optional(),
  sortBy: z.enum(["name", "created_at", "updated_at"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type ProjectFilterParams = z.infer<typeof projectFilterSchema>;


