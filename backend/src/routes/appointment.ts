import { Router, Request, Response } from "express";
import AppointmentController from "../controllers/appointment";

const router = Router();
const controller = new AppointmentController();

router.post("/", async (req: Request, res: Response) => {
  await controller.createAppointment(req, res);
});
router.get("/", async (req: Request, res: Response) => {
  await controller.getAppointments(req, res);
});
router.get("/fields", async (req: Request, res: Response) => {
  await controller.getFields(req, res);
});
router.delete("/:id", async (req: Request, res: Response) => {
  await controller.deleteAppointment(req, res);
});

export default router;
