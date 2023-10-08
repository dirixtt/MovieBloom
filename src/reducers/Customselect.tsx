// selectSlice.js
import { createSlice } from '@reduxjs/toolkit';

const selectSlice = createSlice({
  name: 'CustomSelect',
  initialState: {
    selectedOption: null,
  },
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { setSelectedOption } = selectSlice.actions;
export const selectSelectedOption = (state:any) => state.selectedOption;

export default selectSlice.reducer;
