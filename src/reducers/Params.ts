import { createSlice } from "@reduxjs/toolkit";

interface ParamsState {
  query: any;
  search: string | null;
  category: string | null;
  genre: string | null;
  rate: string | null;
  time: string | null;
  year: string | null;
  language: string | null;
  error: string | null;
}

const initialState: ParamsState = {
  query: null,
  search: null,
  category: null,
  genre: null,
  rate: null,
  time: null,
  year: null,
  language: null,
  error: null,
};

export const paramsSlice = createSlice({
  name: "params",
  initialState: initialState,
  reducers: {
    updateParams: (state, action) => {
      Object.assign(state, action.payload);
      state.query = action.payload;
    },

    updateCategory: (state, action) => {
      state.query.category = action.payload;
    },
    paramsFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { updateCategory, updateParams, paramsFail } = paramsSlice.actions;

export default paramsSlice.reducer;
