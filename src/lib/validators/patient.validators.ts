import { z } from 'zod';
export const PatientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().min(0, "Age must be a positive number"),
    gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
    medicalHistory: z.array(z.string()).optional(),
  });
export type PatientSchemaType = z.infer<typeof PatientSchema>;

export const getPatientByIdSchema = z.object({
    id: z.string().min(1, 'Patient id is required'),
  });

export type PatientSearchByIdType = z.infer<typeof getPatientByIdSchema>;

  
  