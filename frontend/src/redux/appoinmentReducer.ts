import { createSlice } from "@reduxjs/toolkit";

type Appointment = {
  id: string;
};

type State = {
  appoinments: Appointment[];
};

const initialState: State = {
  appoinments: [],
};

export const appoinmentSlice = createSlice({
  name: "appoinments",
  initialState,
  reducers: {
    addAppointments: (state, action) => {
      state.appoinments = action.payload;
    },
    addAnAppointment: (state, action) => {
      const actualData = [...state.appoinments];
      state.appoinments = [...actualData, action.payload];
    },
    cancelAppointment: (state, action) => {
      state.appoinments = state.appoinments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
  },
});

export const { addAppointments, cancelAppointment, addAnAppointment } =  appoinmentSlice.actions;