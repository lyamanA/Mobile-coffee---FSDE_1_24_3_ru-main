import { z } from "zod";

export const cardSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  cardHolder: z.string().min(2, "Enter card holder name"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
  cvv: z.string().min(3).max(4),
  cardImage: z.string().optional(),
});

export type CardFormData = z.infer<typeof cardSchema>;