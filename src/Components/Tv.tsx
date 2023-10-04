import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";
import "swiper/swiper-bundle.css";

interface Movie {
  title: string;
  id: number;
  release_date: string;
  poster_path: string;
}

export default function Tv() {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [more, showMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?page=1&api_key=1ca93d75b94136d96a48b22202fa8f52`
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

  return (
    <div className=" container text-white my-14">
      <Link to="/trend" className="text-3xl font-semibold m-auto  flex font-sans ">
        Trend movies <IoIosArrowForward className="text-lg mt-3.5 ml-2" />{" "}
      </Link>
      <div className="flex flex-wrap justify-between mt-10 gap-y-10 ">
        
          {(more ?  popular : popular.slice(0, 5)).map((movie: Movie, index: number) => (
            <div
              className="text-white flex flex-col items-center  justify-center group shadow-2xl duration-200 w-[100px] xl:w-[210px] 2xl:w-[275px]"
              key={index}
            >
              <img
                className="group-hover:shadow-[#505454] w-full duration-300 h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl object-cover group-hover:scale-105 shadow-3xl"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
              <div className="group-hover:shadow-[#505454] flex flex-col justify-center items-center shadow-3xl group-hover:scale-105 rounded-xl duration-500 h-[100px] w-full mt-5 p-3 bg-[#171818] ">
                <div className="xl:text-[15px] 2xl:text-md">
                  <p>Title: {movie.title.length >= 15 ? movie.title.slice(0, 15) + '...' : movie.title}</p>
                  <p>Date: {moment(movie.release_date).format("LL")}</p>
                </div>
              </div>
            </div>
          ))}
    
      </div>
      <button onClick={() => showMore(!more)} className="active:scale-95 hover:shadow-[#1f2020] shadow-3xl duration-300 mt-10 py-2 font-semibold rounded  container m-auto bg-[#1f2020]">{more ? "Hide" : "Show more"}</button>
    </div>
  );
}
