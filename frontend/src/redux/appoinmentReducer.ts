import { createSlice } from "@reduxjs/toolkit";
import type { Appointment as AppointmentType } from "../types/appoinment";

type Appointment = AppointmentType;

type State = {
  appointments: Appointment[];
};

const initialState: State = {
  appointments: [],
};

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    addAnAppointment: (state, action) => {
      const actualData = [...state.appointments];
      state.appointments = [...actualData, action.payload];
    },
    cancelAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    updateAppointment: (state, action) => {
      const { id, status } = action.payload;
      state.appointments = state.appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      );
    },
  },
});

export const { addAppointments, cancelAppointment, addAnAppointment, updateAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;