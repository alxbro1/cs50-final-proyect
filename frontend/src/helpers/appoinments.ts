import type { Appointment } from "../types/appoinment";
import axios from "axios";

export class AppointmentsService {
  static async getByUserId(userId: number, professionalId?: number): Promise<Appointment[]> {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get<Appointment[]>(`${apiUrl}/appointments?userId=${userId}&professionalId=${professionalId}`);
      return response.data;
    } catch {
      throw new Error("Failed to fetch appointments");
    }
  }

  static async getByProfessionalId(professionalId: number): Promise<Appointment[]> {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get<Appointment[]>(`${apiUrl}/appointments?professionalId=${professionalId}`);
      return response.data;
    } catch {
      throw new Error("Failed to fetch appointments");
    }
  }

  static async create(
    appointmentData: Omit<
      Appointment,
      "id" | "createdAt" | "updatedAt" | "professional" | "user"
    >
  ): Promise<Appointment> {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post<Appointment>(
        `${apiUrl}/appointments`,
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch {
      throw new Error("Failed to create appointment");
    }
  }
}
