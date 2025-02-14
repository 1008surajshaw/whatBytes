import type { Request, Response } from "express";
import Doctor from "../models/Docters";
import { DoctorSchema, getDoctorByIdSchema } from "../lib/validators/doctor.validators";
import { standardizeApiError, ErrorHandler } from "../lib/error";
import { SuccessResponse } from "../lib/success";
import User from "../models/User";

interface AuthRequest extends Request {
  user?: any;
}

export const addDoctor = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = DoctorSchema.parse(req.body);
    const userId = req.user?.id;
    const user = await User.findByPk(userId);
    if (!user) throw new ErrorHandler("Not an authorized user", "UNAUTHORIZED");

    const doctor = await Doctor.create(validatedData);
    const response = new SuccessResponse("Doctor created successfully", 201, doctor);
    res.status(201).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const getDoctors = async (_req: Request, res: Response) => {
  try {
    const doctors = await Doctor.findAll();
    const response = new SuccessResponse("Doctors fetched successfully", 200, doctors);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = getDoctorByIdSchema.parse(req.params);
    const doctor = await Doctor.findByPk(id);
    if (!doctor) throw new ErrorHandler("Doctor not found", "NOT_FOUND");
    
    const response = new SuccessResponse("Doctor fetched successfully", 200, doctor);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = getDoctorByIdSchema.parse(req.params);
    const validatedData = DoctorSchema.parse(req.body);

    const doctor = await Doctor.findByPk(id);
    if (!doctor) throw new ErrorHandler("Doctor not found", "NOT_FOUND");
    
    const updatedDoctor = await doctor.update(validatedData);
    const response = new SuccessResponse("Doctor updated successfully", 200, updatedDoctor);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = getDoctorByIdSchema.parse(req.params);
    const doctor = await Doctor.findByPk(id);
    if (!doctor) throw new ErrorHandler("Doctor not found", "NOT_FOUND");
    
    await doctor.destroy();
    const response = new SuccessResponse("Doctor deleted successfully", 200);
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};
