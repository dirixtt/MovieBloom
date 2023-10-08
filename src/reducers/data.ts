import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk action to fetch movie data
export const fetchMovieData = createAsyncThunk(
  "movieData/fetchMovieData", // Use "movieData" here
  async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=1ca93d75b94136d96a48b22202fa8f52"
      );
      // console.log("Request successful"); // Log when the request is successful
      return response.data; // Return the response data, not the entire response object
    } catch (error) {
      console.error("Request failed", error); // Log if there's an error
      throw error;
    }
  }
);

interface MovieState {
  data: object | null; // Change data type to object or null
  loading: boolean;
  error: any;
}

const initialState: MovieState = {
  data: null,
  loading: false, // Add loading state to the initial state
  error: null,
};

export const MovieData = createSlice({
  name: "movieData", // Use "movieData" here
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieData.pending, (state) => {
      state.loading = true;
      state.data = [];
    });
    builder.addCase(fetchMovieData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMovieData.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default MovieData.reducer;
