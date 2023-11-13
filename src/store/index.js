import { configureStore } from "@reduxjs/toolkit";
import countReducer from '../reducers/count';
import CustomSelect from '../reducers/Customselect'
import Login from '../reducers/Login'
import Category from '../reducers/categories'
import Ganre from '../reducers/genre'
export default configureStore({
  reducer: {
    count: countReducer,
   
    CustomSelect: CustomSelect,
    Login: Login,
    Ganre: Ganre,
    Category: Category,
  }
});
