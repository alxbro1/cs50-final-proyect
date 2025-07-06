import { Appointment } from "@prisma/client";
import prisma from "../config/db";

export default class AppointmentService {
  static async getAppointments() {
    const appointments = await prisma.appointment.findMany({
      include: {
        professional: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { date: "asc" },
        { hour: "asc" },
      ],
    });
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
    const fields = [
      { label: "ID", name: "id", type: "number" },
      { label: "name", name: "user", type: "object" },
      { label: "Date", name: "date", type: "date" },
      { label: "Hour", name: "hour", type: "number" },
      { label: "Status", name: "status", type: "string" },
      { label: "Created At", name: "createdAt", type: "date" },
      { label: "Updated At", name: "updatedAt", type: "date" },
      { label: "Professional", name: "professional", type: "object" },
    ];
    return fields;
  }
}
