import { Request, Response } from "express";
import SessionService from "../services/session";
import {
  checkSessionSchema,
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
    const data = checkSessionSchema.parse(req.body);
    if (!data) {
      return res.status(400).json({ error: "Invalid session data" });
    }
    const result = await SessionService.checkSession(data);
    return res.json(result);
  }
}
