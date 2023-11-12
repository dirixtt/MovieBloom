import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import Movies from "./Pages/Movies";
import AboutUs from "./Pages/AboutUs";
import MovieDetails from "./Pages/MovieDetails";
import GenreMovies from "./Pages/GenreMovies";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Sign/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Sign/Register";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/genre/:id" element={<GenreMovies />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
