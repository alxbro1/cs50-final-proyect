import { Router, Request, Response } from "express";
import AuthController from "../controllers/session";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  await AuthController.login(req, res);
});
router.post("/register", async (req: Request, res: Response) => {
  await AuthController.register(req, res);
});
router.get("/session", async (req: Request, res: Response) => {
  await AuthController.checkSession(req, res);
});
export default router;
