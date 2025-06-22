import { Request, Response } from "express";
import SessionService from "../services/session";

export default class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await SessionService.login(email, password);
    res.json(result);
  }

  static async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await SessionService.register(email, password);
    res.json(result);
  }

  static async checkSession(req: Request, res: Response) {
    const { token } = req.body;
    const result = await SessionService.checkSession(token);
    res.json(result);
  }
}
