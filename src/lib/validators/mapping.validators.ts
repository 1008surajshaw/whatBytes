import { z } from 'zod';

export const MappingSchema = z.object({
    doctorId: z.string().min(1, 'Doctor id is required'),
    patientId: z.string().min(1, 'Patients id is required'),
    appointmentDate: z.string().refine(
      (date) => !isNaN(Date.parse(date)),
      "Invalid date format"
    ),
  });

  export const getMappingSchema = z.object({
    doctorId: z.string().min(1, 'Doctor id is required'),
    patientId: z.string().min(1, 'Patient id is required'),
  });
  
  export const getAssignedPatientSchema = z.object({
    doctorId: z.string().min(1, 'Doctor id is required'),
  });
  
  export const getAssignedDoctorSchema = z.object({
    patientId: z.string().min(1, 'Doctor id is required'),
  });

  export const MappingIdSchema = z.object({
    mappingId: z.string().min(1, 'Mapping id is required'),
  });

  export type MappingSchemaType = z.infer<typeof MappingSchema>;

  export type AssignedPatientSearchType = z.infer<typeof getAssignedPatientSchema>;

  export type AssignedDoctorSearchType = z.infer<typeof getAssignedDoctorSchema>;

  export type GetMappingSearchType = z.infer<typeof getMappingSchema>;
