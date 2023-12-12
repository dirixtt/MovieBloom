import { createSlice } from "@reduxjs/toolkit";

interface casts {
  categ: Object | null;
  error: any;
}

const initialState: casts = {
  categ: null,
  error: null,
};

export const castsSlice = createSlice({
  name: "casts",
  initialState: initialState,
  reducers: {
    casts: (state, action) => {
      state.categ = action.payload;
    },
    castsFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { casts, castsFail } = castsSlice.actions;

export default castsSlice.reducer;
