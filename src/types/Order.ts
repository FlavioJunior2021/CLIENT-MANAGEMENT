import { z } from 'zod';

export const OrderSchema = z.object({
  description: z.string(),
  status: z.enum(["RESOLVED", "PENDING"]),
  clientId: z.string(),
});

export const OrderUpdateSchema = z.object({
  description: z.string().optional(),
  status: z.enum(["RESOLVED", "PENDING"]).optional(),
  createdAt: z.date().optional(),
  clientId: z.string().optional(),
});

export type Order = z.infer<typeof OrderSchema>;
