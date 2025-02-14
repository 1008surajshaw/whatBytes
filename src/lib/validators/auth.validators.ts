import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email('Email is invalid').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
  });
  
  export type LoginSchemaType = z.infer<typeof LoginSchema>;
  
  export const RegisterSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Email is invalid').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
  });
  
  export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
  