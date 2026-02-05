import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().length(10, "Phone must be 10 digits").optional().nullable(),

  address: z.object({
    fullName: z.string().min(1, "Full name is required"),
    phone: z.string().length(10, "Phone must be 10 digits"),
    line1: z.string().min(1, "Address is required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().length(6, "Pincode must be 6 digits"),
  }).optional().nullable(),
});
