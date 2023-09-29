import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovieData } from "./data";


// const data = useSelector((state) => state.movieData);
// const dispatch = useDispatch();
// useEffect(() => {
//   dispatch(fetchMovieData());
// }, []);

// const movies = data?.data?.results || [{ id: 1 }];
// const poster_id = movies.map((i) => i.poster_path);
// console.log(poster_id);
// export const fetchMovieImg = createAsyncThunk(
//   "data/fetchMovieData",
//   async () => {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/${poster_id}/images`
//     );

//     return response.data; // Return the response data, not the entire response object
//   }
// );



const initialState = {
  imgs: null,
  loading: false, // Add loading state to the initial state
  error: undefined,
};

export const MovieImg = createSlice({
  name: "movieImg", // Change the slice name to "movieData"
  initialState,
  reducers: {},
 });

export default MovieImg.reducer;
