import { z} from 'zod'
export const DoctorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    specialization: z.string().min(1, "Specialization is required"),
    experience: z.number().min(0, "Experience must be a non-negative number"),
  });
  export type DoctorSchemaType = z.infer<typeof DoctorSchema>;


  export const getDoctorByIdSchema = z.object({
    id: z.string().min(1, 'Doctor id is required'),
  });
  
  export type DoctorSearchByIdType = z.infer<typeof getDoctorByIdSchema>;

  
  