import { Appointment } from "@prisma/client";
import prisma from "../config/db";

export default class AppointmentService {
  static async getAppointments(userId?: number, professionalId?: number) {
    const where = {
      ...(userId && { userId }),
      ...(professionalId && { professionalId }),
    };
    const appointments = await prisma.appointment.findMany({
      where,
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
    console.log("Creating appointment with data:", data);
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
      { label: "Status", name: "status", type: "string", select: true, options: ["PENDING", "CONFIRMED", "CANCELLED"] },
      { label: "Created At", name: "createdAt", type: "date" },
      { label: "Updated At", name: "updatedAt", type: "date" },
      { label: "Professional", name: "professional", type: "object" },
    ];
    return fields;
  }

  static async updateAppointment(id: number, data: Partial<Appointment>) {
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data,
    });
    return updatedAppointment;
  }

  static async getBusyHours(professionalId: number, date: string): Promise<number[]> {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const appointments = await prisma.appointment.findMany({
      where: {
        professionalId,
        date: {
          gte: startDate,
          lt: endDate,
        },
        status: {
          not: "CANCELLED"
        }
      },
      select: {
        hour: true,
      },
    });

    return appointments.map(appointment => appointment.hour);
  }
}
