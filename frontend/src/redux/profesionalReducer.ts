import { createSlice } from "@reduxjs/toolkit";
import type { Professional } from "../types/profesional";

const initialState: Professional[] = [];

const profesionalSlice = createSlice({
  name: "profesional",
  initialState,
  reducers: {
    addProfesional: (state, action) => {
      state.push(action.payload);
    },
    removeProfesional: (state, action) => {
      return state.filter((profesional) => profesional.id !== action.payload);
    },
  },
});

export const { addProfesional, removeProfesional } = profesionalSlice.actions;

export default profesionalSlice.reducer;
