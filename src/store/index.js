import { configureStore } from "@reduxjs/toolkit";
import countReducer from '../reducers/count'
export default configureStore({
    reducer: countReducer
})