import { createSlice } from "@reduxjs/toolkit";

interface genre {
  categ: Object | null;
  error: any;
}

const initialState: genre = {
  categ: null,
  error: null,
};

export const genreSlice = createSlice({
  name: "genre",
  initialState: initialState,
  reducers: {
    genre: (state, action) => {
      state.categ = action.payload;
    },
    genreFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { genre, genreFail } = genreSlice.actions;

export default genreSlice.reducer;
