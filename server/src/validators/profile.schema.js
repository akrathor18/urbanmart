import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email address").optional(),

  phone: z
    .string()
    .length(10, "Phone must be 10 digits")
    .optional()
    .nullable(),

  address: z
    .object({
      fullName: z.string().min(1).optional(),
      phone: z
        .string()
        .length(10, "Phone must be 10 digits")
        .optional()
        .nullable(),
      line1: z.string().min(1).optional(),
      line2: z.string().optional().nullable(),
      city: z.string().min(1).optional(),
      state: z.string().min(1).optional(),
      pincode: z.string().length(6).optional(),
    })
    .optional()
    .nullable(),
});
