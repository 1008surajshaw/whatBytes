import type { Request, Response } from "express";
import Patient from "../models/Patient";
import { PatientSchema, getPatientByIdSchema } from "../lib/validators/patient.validators";
import { standardizeApiError, ErrorHandler } from "../lib/error";
import { SuccessResponse } from "../lib/success";
import User from "../models/User";

interface AuthRequest extends Request {
  user?: any;
}

export const addPatient = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = PatientSchema.parse(req.body);
    const userId = req.user?.id;
    const user = await User.findByPk(userId);
    if (!user) throw new ErrorHandler("Not an authorized user", "UNAUTHORIZED");

    const patient = await Patient.create(validatedData);
    const response = new SuccessResponse("Patient added successfully", 201, patient);
    res.status(201).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const getPatients = async (_req: Request, res: Response) => {
  try {
    const patients = await Patient.findAll();
    const response = new SuccessResponse("Patients fetched successfully", 200, patients);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const getPatient = async (req: Request, res: Response) => {
  try {
    const { id } = getPatientByIdSchema.parse(req.params);
    const patient = await Patient.findByPk(id);
    if (!patient) throw new ErrorHandler("Patient not found", "NOT_FOUND");
    
    const response = new SuccessResponse("Patient fetched successfully", 200, patient);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const { id } = getPatientByIdSchema.parse(req.params);
    const validatedData = PatientSchema.parse(req.body);

    const patient = await Patient.findByPk(id);
    if (!patient) throw new ErrorHandler("Patient not found", "NOT_FOUND");
    
    const updatedPatient = await patient.update(validatedData);
    const response = new SuccessResponse("Patient updated successfully", 200, updatedPatient);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const { id } = getPatientByIdSchema.parse(req.params);
    const patient = await Patient.findByPk(id);
    if (!patient) throw new ErrorHandler("Patient not found", "NOT_FOUND");
    
    await patient.destroy();
    const response = new SuccessResponse("Patient deleted successfully", 200);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};
