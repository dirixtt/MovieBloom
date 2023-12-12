import { useState } from "react";
import Search, { SearchProps } from "antd/es/input/Search";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { FiFilter } from "react-icons/fi";

export default function MainMovies() {
  const onSearch: SearchProps["onSearch"] = async (value, _e) => {
    if (value.length > 0) {
      await fetchData(value);
    }
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setMovies] = useState<any>();
  interface Movie {
    name: string;
    original_title: string;
    _id: number;
    release_date: string;
    image: any;
  }
  const fetchData = async (value: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/movies?search=${value}`
      );

      setMovies(response.data.movies);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container my-10">
      <div className="flex gap-2 h-10 items-center">
        <Search
          className=" bg-[#d9d9d9] rounded-md"
          placeholder="input search text"
          onSearch={onSearch}
          size="large"
        />
      </div>
      <div></div>
      <div className="flex flex-wrap justify-between gap-y-10 ">
        {loading
          ? "Loading..."
          : data &&
            data?.map((movie: Movie, index: number) => (
              <Link
                to={`/movie/${movie._id}`}
                className="text-white mt-10 flex flex-col items-center relative justify-center group shadow-2xl duration-200 w-[100px] xl:w-[220px] 2xl:w-[275px]"
                key={index}
              >
                <img
                  className="group-hover:shadow-[#505454] w-full duration-300 h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl object-cover group-hover:scale-105 shadow-3xl"
                  src={movie.image.url}
                  alt=""
                />
                {/* <div className="w-full group-hover:bg-black/70 group-hover:scale-105 duration-300 h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl absolute top-0"></div> */}
                <div className="group-hover:shadow-[#505454] flex flex-col justify-center items-center shadow-3xl group-hover:scale-105 rounded-xl duration-500 h-[100px] w-full mt-5 p-3  ">
                  <div className="xl:text-[15px] 2xl:text-md">
                    <p>
                      Title:{" "}
                      {movie.name
                        ? movie.name.length >= 15
                          ? movie.name.slice(0, 15) + "..."
                          : movie.name
                        : movie.original_title
                        ? movie.original_title.length >= 15
                          ? movie.original_title.slice(0, 15) + "..."
                          : movie.original_title
                        : "Unknown Title"}
                    </p>

                    <p>Date: {moment(movie.release_date).format("LL")}</p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
