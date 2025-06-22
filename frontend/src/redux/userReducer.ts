import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const Slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {  loginUser } =
  Slice.actions;
