import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
import Loader from "./Loader";

interface Movie {
  name: string;
  _id: number;
  year: string;
  image: any;
}

export default function Tv() {
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://film24-org-by-codevision.onrender.com/api/movies/rated/top`
        );
        console.log(response.data);
        setPopular(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (popular.length <= 0) {
    return <Loader />;
  }

  return (
    <div className=" container text-white my-14">
      <Link
        to="/trend"
        className="text-3xl font-semibold m-auto  flex font-sans "
      >
        Trend movies <IoIosArrowForward className="text-lg mt-3.5 ml-2" />{" "}
      </Link>
      <div className="flex flex-wrap justify-between mt-10 gap-y-10 ">
        {(popular.slice(0, 5)).map(
          (movie: Movie, index: number) => (
            <Link
              to={`/movie/${movie._id}`}
              className="text-white flex flex-col items-center relative justify-center group shadow-2xl duration-200 w-[100px] xl:w-[220px] 2xl:w-[275px]"
              key={index}
            >
              <img
                className="group-hover:shadow-[#505454] w-full duration-300 h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl object-cover group-hover:scale-105 shadow-3xl"
                src={`${movie.image.url}`}
                alt=""
              />
              {/* <div className="w-full group-hover:bg-black/70 group-hover:scale-105 duration-300 h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl absolute top-0"></div> */}
              <div className="group-hover:shadow-[#505454] flex flex-col justify-center items-center shadow-3xl group-hover:scale-105 rounded-xl duration-500 h-[100px] w-full mt-5 p-3 bg-[#171818] ">
                <div className="xl:text-[15px] 2xl:text-md">
                  <p>
                    Title:{" "}
                    {movie.name.length >= 15
                      ? movie.name.slice(0, 15) + "..."
                      : movie.name}
                  </p>
                  <p>Date: {movie.year}</p>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
