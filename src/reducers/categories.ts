import { createSlice } from "@reduxjs/toolkit";

interface category {
  categ: Object | null;
  error: any;
}

const initialState: category = {
  categ: null,
  error: null,
};

export const loginSlice = createSlice({
  name: "Category",
  initialState: initialState,
  reducers: {
    category: (state, action) => {
      state.categ = action.payload;
    },
    categoryFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { category, categoryFail } = loginSlice.actions;

export default loginSlice.reducer;
