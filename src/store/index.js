import { configureStore } from "@reduxjs/toolkit";
import countReducer from '../reducers/count';
import movieDataReducer from '../reducers/data';

export default configureStore({
  reducer: {
    count: countReducer,
    movieData: movieDataReducer
  }
});
