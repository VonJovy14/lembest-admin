import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    activeNavigation: "home",
  },
  reducers: {
    updateActiveNavigation: (state, action) => {
      state.activeNavigation = action.payload;
    },
  },
});

export const { updateActiveNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
