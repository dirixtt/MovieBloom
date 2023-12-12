import Footer from "../Components/Footer.tsx";
import MainMovies from "../Components/MainMovies.tsx";
import Slider from "../Components/Slider.tsx";
import Tv from "../Components/Tv.tsx";

export default function Home() {
  return (
    <div className="bg-[#171818]">
      <Slider />
      <MainMovies />
      <Tv/>
      <Footer />
    </div>
  );
}
