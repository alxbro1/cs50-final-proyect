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
router.get("/busy-hours", async (req: Request, res: Response) => {
  await controller.getBusyHours(req, res);
});
router.delete("/:id", async (req: Request, res: Response) => {
  await controller.deleteAppointment(req, res);
});
router.patch("/:id", async (req: Request, res: Response) => {
  await controller.updateAppointment(req, res);
});

export default router;
