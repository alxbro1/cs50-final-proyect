import type { Professional } from "./profesional";
import type { User } from "./user";

export type Status = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export const AppointmentStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
} as const;

export type Appointment = {
  id: number;
  userId: number;
  date: Date;
  hour: number; // <-- agrega esta línea
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  professional: Professional;
  professionalId: number;
}