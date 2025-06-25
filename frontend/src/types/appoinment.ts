import type { Professional } from "./profesional";
import type { User } from "./user";

export type Status = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export type Appointment = {
  id: number;
  userId: number;
  date: Date;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  professional: Professional;
  professionalId: number;
}