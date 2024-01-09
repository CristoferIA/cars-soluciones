import { createSlice } from "@reduxjs/toolkit";

export const nombreMenuSlice = createSlice({
  name: "nombreMenu",
  initialState: "",
  reducers: {
    setNombreMenu: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNombreMenu } = nombreMenuSlice.actions;

export default nombreMenuSlice.reducer;
