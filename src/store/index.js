import { configureStore } from "@reduxjs/toolkit";
import countReducer from '../reducers/count';
import CustomSelect from '../reducers/Customselect'
import Login from '../reducers/Login'
import Categories from '../reducers/categories'
import Ganre from '../reducers/genre'
import Casts from '../reducers/casts'
export default configureStore({
  reducer: {
    count: countReducer,
   
    CustomSelect: CustomSelect,
    Login: Login,
    Ganre: Ganre,
    Casts: Casts,
    Categories: Categories,
  }
});
