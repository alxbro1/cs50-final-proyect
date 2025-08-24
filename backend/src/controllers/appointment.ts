import { Request, Response } from "express";
import AppointmentService from "../services/appointment";

export default class AppointmentController {
  async getAppointments(req: Request, res: Response) {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    if (userId) {
      const appointments = await AppointmentService.getAppointments(userId);
      return res.json(appointments);
    }
    const professionalId = req.query.professionalId
      ? Number(req.query.professionalId)
      : undefined;
    if (professionalId) {
      const appointments = await AppointmentService.getAppointments(
        undefined,
        professionalId
      );
      return res.json(appointments);
    }
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
  async updateAppointment(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const updatedAppointment = await AppointmentService.updateAppointment(
      Number(id),
      data
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(updatedAppointment);
  }

  async getBusyHours(req: Request, res: Response) {
    const professionalId = req.query.professionalId 
      ? Number(req.query.professionalId) 
      : undefined;
    const date = req.query.date as string;
    
    if (!professionalId || !date) {
      return res.status(400).json({ 
        error: "Both professionalId and date are required" 
      });
    }

    try {
      const busyHours = await AppointmentService.getBusyHours(professionalId, date);
      res.json(busyHours);
    } catch (error) {
      console.error("Error fetching busy hours:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
