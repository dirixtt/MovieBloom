import { createSlice } from "@reduxjs/toolkit";


interface CountState {
  count: number;
}




export const countSlice = createSlice({
  name: "count",
  initialState: { count: 0 } as CountState,
  reducers: {
    like: (state) => {
      state.count += 1;
    },
    unlike: (state) => {
      state.count -= 1;
    },
  },
});

export const { like, unlike } = countSlice.actions;

export default countSlice.reducer;
