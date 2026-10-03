import { Request, Response } from "express";
import { signupService } from "@/services/auth/signup-service";

export class AuthController {
  // Handle Signup Controller Function
  public signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body ?? {};
    const result = await signupService(name, email, password);
    return res.status(result.code).json(result);
  }
}