import { configureStore } from "@reduxjs/toolkit";
import countReducer from '../reducers/count';
import movieDataReducer from '../reducers/data';
import CustomSelect from '../reducers/Customselect'
export default configureStore({
  reducer: {
    count: countReducer,
    movieData: movieDataReducer,
    CustomSelect: CustomSelect
  }
});
