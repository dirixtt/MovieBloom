import { configureStore } from "@reduxjs/toolkit";
import CustomSelect from '../reducers/Customselect'
import Login from '../reducers/Login'
import Categories from '../reducers/categories'
import Ganre from '../reducers/genre'
import Casts from '../reducers/casts'
import Favourite from '../reducers/Favourite'
import Params from '../reducers/Params'
export default configureStore({
  reducer: {
    CustomSelect: CustomSelect,
    params: Params,
    Login: Login,
    Favourite: Favourite,
    Ganre: Ganre,
    Casts: Casts,
    Categories: Categories,
  }
});
