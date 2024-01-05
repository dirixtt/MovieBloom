import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Search from "./Pages/Search";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const shouldRenderHeaderAndFooter = HeaderAndFooterConditionalRendering();

  return (
    <>
      {shouldRenderHeaderAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/genre/:id" element={<GenreMovies />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      {shouldRenderHeaderAndFooter && <Footer />}
    </>
  );
}

function HeaderAndFooterConditionalRendering() {
  const location = useLocation();
  const excludeRoutes = ["/login", "/register"];
  const shouldRender = !excludeRoutes.includes(location.pathname);

  return shouldRender;
}
