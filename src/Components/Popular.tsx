import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { AiOutlineArrowDown } from "react-icons/ai";

interface Movie {
  title: string;
  id: number;
  release_date: string;
  backdrop_path: string;
}

export default function Popular() {
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=1ca93d75b94136d96a48b22202fa8f52`
        );

        setPopular(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (popular.length <= 0) {
    return <div>Loading...</div>;
  }
  const swiperRef1 = useRef;

  return (
    <div className=" text-white my-14">
      <Link to="/popular" className="text-3xl font-semibold m-auto container flex font-sans ">
        Popular movies <IoIosArrowForward className="text-lg mt-3.5 ml-2" />{" "}
      </Link>
      <div className="relative ">
        <Swiper
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          autoplay={{
            delay: 3000, // Set the delay in milliseconds (e.g., 3000ms = 3 seconds)
          }}
          onBeforeInit={(swiper) => {
            swiperRef1.current = swiper;
          }}
          className="h-[570px] flex items-center"
          modules={[Navigation, Autoplay]} // Add Autoplay module here
        >
          {popular.map((movie: Movie, index: number) => (
            <SwiperSlide
              className="text-white flex flex-col items-center justify-center group shadow-2xl duration-200  max-w-[275px]"
              key={index}
            >
              <img
                className="group-hover:shadow-[#505454] w-full duration-300 h-[320px] rounded-xl object-cover group-hover:scale-105 shadow-3xl"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
              <div className="group-hover:shadow-[#505454] flex flex-col justify-center items-center shadow-3xl group-hover:scale-105 rounded-xl duration-500 h-[100px] w-full mt-5 p-3 bg-[#171818] ">
                <div>
                  <p>Title: {movie.title}</p>
                  <p>Released: {moment(movie.release_date).format("LL")}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="m-auto text-center">
          <button
            className="rotate-90 bg-[#1f2020] active:scale-90 h-10 rounded-full mr-2 shadow-2xl  justify-center items-center w-10"
            onClick={() => swiperRef1.current?.slidePrev()}
          >
            <AiOutlineArrowDown className="inset-0 m-auto" />
          </button>
          <button
            className="-rotate-90 bg-[#1f2020] active:scale-90 shadow-white h-10 rounded-full ml-2  justify-center items-center w-10"
            onClick={() => swiperRef1.current?.slideNext()}
          >
            {" "}
            <AiOutlineArrowDown className="inset-0 m-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
