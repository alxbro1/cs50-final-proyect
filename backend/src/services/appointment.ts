import { Appointment } from "@prisma/client";
import prisma from "../config/db";

export default class AppointmentService {
  static async getAppointments() {
    const appointments = await prisma.appointment.findMany();
    return appointments;
  }

  static async createAppointment(data: Omit<Appointment, "id">) {
    const newAppointment = await prisma.appointment.create({
      data,
    });
    return newAppointment;
  }

  static async deleteAppointment(id: number) {
    const deletedAppointment = await prisma.appointment.delete({
      where: { id },
    });
    return deletedAppointment;
  }

  static async getFields() {
    const fields = [{ label: "ID", name: "id" }, { label: "Name", name: "name" }];
    return fields;
  }
}
