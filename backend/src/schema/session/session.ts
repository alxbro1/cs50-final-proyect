import zod from "zod";

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
});

export const registerSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
  name: zod.string().min(2).max(100),
  role: zod.enum(["PATIENT", "ADMIN"]).default("PATIENT"),
});

export const checkSessionSchema = zod.object({
  token: zod.string().min(10).max(100),
});
export type LoginSchema = zod.infer<typeof loginSchema>;
export type RegisterSchema = zod.infer<typeof registerSchema>;
export type CheckSessionSchema = zod.infer<typeof checkSessionSchema>;