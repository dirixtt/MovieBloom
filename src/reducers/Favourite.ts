import { createSlice } from "@reduxjs/toolkit";

interface favourite {
  favourite: any;
  error: any;
}

const initialState: favourite = {
  favourite: [],
  error: null,
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: initialState,
  reducers: {
    favourite: (state, action) => {
      state.favourite = action.payload;
    },
    favouriteFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { favourite, favouriteFail } = favouriteSlice.actions;

export default favouriteSlice.reducer;
