import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User";
import { LoginSchema, RegisterSchema } from "../lib/validators/auth.validators";
import { SuccessResponse } from "../lib/success"
import { ErrorHandler, standardizeApiError } from "../lib/error"

export const register = async (req: Request, res: Response) => {
  try {
    const data = RegisterSchema.parse(req.body);
    const existingUser = await User.findOne({ where: { email: data.email } });

    if (existingUser) {
      throw new ErrorHandler("User already exists", "CONFLICT");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.create({ name: data.name, email: data.email, password: hashedPassword });

    const response = new SuccessResponse("Registered successfully", 201);
    res.status(201).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = LoginSchema.parse(req.body);
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new ErrorHandler("User does not exist", "NOT_FOUND");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new ErrorHandler("Incorrect password", "UNAUTHORIZED");
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new ErrorHandler("Internal server error", "INTERNAL_SERVER_ERROR");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: "24h" });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    const response = new SuccessResponse("Logged in successfully", 200, { token, user });
    res.status(200).json(response.serialize());
  } catch (error) {
    const standardizedError = standardizeApiError(error);
    res.status(standardizedError.code).json(standardizedError);
  }
};
