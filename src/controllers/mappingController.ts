import type { Request, Response } from "express"
import PatientDoctorMapping from "../models/PatientDoctorMapping"
import Patient from "../models/Patient"
import Doctor from "../models/Docters"
import { getAssignedDoctorSchema, getAssignedPatientSchema, MappingIdSchema, MappingSchema } from "../lib/validators/mapping.validators"
import { SuccessResponse } from "../lib/success"
import { ErrorHandler, standardizeApiError } from "../lib/error"

export const assignDoctorToPatient = async (req: Request, res: Response) => {
  try {
    // Validate request body using schema
    const validatedParams = MappingSchema.parse(req.body);
    const { patientId, doctorId, appointmentDate } = validatedParams;

    // Check if the patient exists
    const patientExists = await Patient.findByPk(patientId);
    if (!patientExists) {
      throw new ErrorHandler("Patient not found", "NOT_FOUND");
    }

    // Check if the doctor exists
    const doctorExists = await Doctor.findByPk(doctorId);
    if (!doctorExists) {
      throw new ErrorHandler("Doctor not found", "NOT_FOUND");
    }

    // Check if the patient is already mapped to this doctor on the same date
    const existingMapping = await PatientDoctorMapping.findOne({
      where: { patientId, doctorId, appointmentDate },
    });

    if (existingMapping) {
      throw new ErrorHandler("Mapping already exists for this patient and doctor on the given date", "CONFLICT");
    }

    // Create the mapping
    const mapping = await PatientDoctorMapping.create({
      patientId,
      doctorId,
      appointmentDate,
    });

    // Send success response
    const response = new SuccessResponse("Mapping created successfully", 200, mapping);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const getMappings = async (req: Request, res: Response) => {
  try {
    const mappings = await PatientDoctorMapping.findAll({
      include: [
        { model: Patient, as: "patient" },
        { model: Doctor, as: "doctor" },
      ],
    })
    if(!mappings){
      throw new ErrorHandler("Mapping not found", "NOT_FOUND");

    }
    if(mappings.length == 0){
      res.json("No mapping Available")
    }
    const response = new SuccessResponse("Mapping retrieved successfully", 200, mappings);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
}

export const getDoctorsForPatient = async (req: Request, res: Response) => {
  try {
    console.log(req.params)
     const validatedParams = getAssignedDoctorSchema.parse(req.params);
     const { patientId } = validatedParams;
     console.log(patientId);

     const mappings = await PatientDoctorMapping.findAll({
      where: { patientId }, // Search in PatientDoctorMapping
      include: [{ model: Doctor, as: "doctor" }], // Include Doctor details
    });

    if (!mappings) {
      throw new ErrorHandler("Doctor not found", "NOT_FOUND");
    }
    
    const response = new SuccessResponse("Doctor retrieved successfully", 200, mappings);
    res.status(200).json(response.serialize());
    
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
}


export const getPatientForDoctor = async (req: Request, res: Response) => {
  try {
    
     const validatedParams = getAssignedPatientSchema.parse(req.params);
     const { doctorId } = validatedParams;
    
     const mappings = await PatientDoctorMapping.findAll({
      where: { doctorId }, // Search in PatientDoctorMapping
      include: [{ model: Patient, as: "patient" }], // Include Patient details
    });

    if (!mappings || mappings.length === 0) {
      throw new ErrorHandler("No patients found for this doctor", "NOT_FOUND");
    }

    
    const response = new SuccessResponse("Doctor retrieved successfully", 200, mappings);
    res.status(200).json(response.serialize());
    
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
}

export const removeMapping = async (req: Request, res: Response) => {
  try {
    console.log(req.params)
    
    const validatedParams = MappingIdSchema.parse(req.params);
    
    const { mappingId } = validatedParams;
    console.log(mappingId)
    // Check if the mapping exists
    const mapping = await PatientDoctorMapping.findByPk(mappingId);
    if (!mapping) {
      throw new ErrorHandler("Mapping not found", "NOT_FOUND");
    }

    // Delete the mapping
    await mapping.destroy();

    const response = new SuccessResponse("Mapping deleted successfully", 200, {});
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};
export const updateMapping = async (req: Request, res: Response) => {
  try {
    // Validate request parameters and body
    const validatedBody = MappingSchema.parse(req.body);
    const validatedParams = MappingIdSchema.parse(req.params);
    const {mappingId} = validatedParams;
    const { patientId, doctorId, appointmentDate } = validatedBody;

    // Check if the mapping exists
    const mapping = await PatientDoctorMapping.findByPk(mappingId);
    if (!mapping) {
      throw new ErrorHandler("Mapping not found", "NOT_FOUND");
    }

    // Check if the new patient exists
    const patientExists = await Patient.findByPk(patientId);
    if (!patientExists) {
      throw new ErrorHandler("Patient not found", "NOT_FOUND");
    }

    // Check if the new doctor exists
    const doctorExists = await Doctor.findByPk(doctorId);
    if (!doctorExists) {
      throw new ErrorHandler("Doctor not found", "NOT_FOUND");
    }

    // Update the mapping
    await mapping.update({ patientId, doctorId, appointmentDate });

    const response = new SuccessResponse("Mapping updated successfully", 200, mapping);
    res.status(200).json(response.serialize());

  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};


