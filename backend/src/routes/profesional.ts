import { Router, Request, Response } from "express";
import ProfessionalController from "../controllers/profesional";

const router = Router();
const controller = new ProfessionalController();

router.post("/", async (req: Request, res: Response) => {
  await controller.createProfessional(req, res);
});
router.get("/", async (req: Request, res: Response) => {
  await controller.getProfessionals(req, res);
});
router.delete("/:id", async (req: Request, res: Response) => {
  await controller.deleteProfessional(req, res);
});

export default router;
