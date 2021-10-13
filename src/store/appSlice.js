import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isMobile: false,
  },
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsMobile } = appSlice.actions;

export default appSlice.reducer;
