import { Request, Response } from "express";
import AppointmentService from "../services/appointment";

export default class AppointmentController {
  async getAppointments(req: Request, res: Response) {
    const appointments = await AppointmentService.getAppointments();
    return res.json(appointments);
  }
  async createAppointment(req: Request, res: Response) {
    const data = req.body;
    const newAppointment = await AppointmentService.createAppointment(data);
    res.status(201).json(newAppointment);
  }
  async deleteAppointment(req: Request, res: Response) {
    const { id } = req.params;
    const deletedAppointment = await AppointmentService.deleteAppointment(
      Number(id)
    );
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(204).send();
  }

  async getFields(req: Request, res: Response) {
    const fields = await AppointmentService.getFields();
    return res.json(fields);
  }
}
