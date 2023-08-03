import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uuid: null,
};

const uuidSlice = createSlice({
  name: "uuid",
  initialState,
  reducers: {
    picked: (state, action) => {
      state.uuid = action.payload;
    },
  },           
});

export default uuidSlice.reducer
export const { picked } = uuidSlice.actions;
