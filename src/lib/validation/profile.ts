import { z } from "zod";

/**
 * Profile update schema
 */
export const profileUpdateSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .optional()
    .nullable(),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .nullable(),
  role: z
    .string()
    .max(100, "Role must be less than 100 characters")
    .optional()
    .nullable(),
  avatarUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

/**
 * Onboarding form schema
 */
export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  role: z
    .string()
    .max(100, "Role must be less than 100 characters")
    .optional(),
  goals: z
    .array(z.string())
    .min(1, "Please select at least one goal")
    .max(5, "Please select up to 5 goals"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

/**
 * Avatar upload schema
 */
export const avatarUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "File must be a JPEG, PNG, or WebP image",
      }
    ),
});

export type AvatarUploadFormData = z.infer<typeof avatarUploadSchema>;

