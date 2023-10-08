import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import Movies from "./Pages/Movies";
import AboutUs from "./Pages/AboutUs";
import MovieDetails from "./Pages/MovieDetails";
import GenreMovies from "./Pages/GenreMovies";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/movie/:id" element={<MovieDetails  />} />
          <Route path="/genre/:id" element={<GenreMovies  />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
