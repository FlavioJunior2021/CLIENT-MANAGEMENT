import { z } from 'zod';

export const ClientSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export const updateClientSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

export type Client = z.infer<typeof ClientSchema>;
