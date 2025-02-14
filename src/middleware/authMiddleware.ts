import type { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: User;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    console.log("Checking authentication...");

    // Ensure req.cookies is defined before accessing `token`
    const token = 
      (req.cookies ? req.cookies.token : null) || 
      (req.body ? req.body.token : null) || 
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.warn("No token provided.");
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables.");
      return res.status(500).json({ message: "Internal server error" });
    }

    console.log("Token received:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
    console.log("Decoded JWT:", decoded);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.warn("User not found for ID:", decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    console.log("Authentication successful!");
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
