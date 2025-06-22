import { configureStore } from "@reduxjs/toolkit";
import { Slice } from "./userReducer"; 
import { appoinmentSlice } from "./appoinmentReducer";

export const store = configureStore({
  reducer: { user: Slice.reducer, appoinments: appoinmentSlice.reducer },
});
