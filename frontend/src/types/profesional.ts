import type { Appointment } from "./appoinment";

export type Professional = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  appointments: Appointment[];
}