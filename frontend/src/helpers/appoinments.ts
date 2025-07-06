import type { Appointment } from "../types/appoinment";


export class AppointmentsService {
  static async create(
    appointmentData: Omit<
      Appointment,
      "id" | "createdAt" | "updatedAt" | "professional" | "user"
    >
  ): Promise<Appointment> {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) {
      throw new Error("Failed to create appointment");
    }
    return response.json();
  }
}
