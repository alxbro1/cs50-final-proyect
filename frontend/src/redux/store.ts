import { configureStore } from "@reduxjs/toolkit";
import { Slice } from "./userReducer"; 
import { appointmentSlice } from "./appoinmentReducer";

export const store = configureStore({
  reducer: { user: Slice.reducer, appointments: appointmentSlice.reducer },
});
