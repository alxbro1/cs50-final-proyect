import e, { Request, Response } from "express";
import SessionService from "../services/session";
import {
  loginSchema,
  registerSchema,
} from "../schema/session/session";

export default class AuthController {
  static async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);
    if (!data) {
      return res.status(400).json({ error: "Invalid login data" });
    }
    const result = await SessionService.login(data);
    if (result.status === 401) {
      return res.status(result.status).json({ message: result.message });
    }
    else if (result.status === 404) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.json(result);
  }

  static async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);
    if (!data) {
      return res.status(400).json({ error: "Invalid registration data" });
    }
    const result = await SessionService.register(data);
    return res.json(result);
  }

  static async checkSession(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const result = await SessionService.checkSession({ token });
    if (result.status === 401) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.status(result.status).json(result.data);
  }
}
