import moment from "moment";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Movies() {
  // const languages: string[] = ["English", "Uzbek"];
  // const year: string[] = ["2000", "2001"];
  // const duration: string[] = ["1-2 hours", "2-3 hours"];
  // const rate: string[] = ["1 star", "2 stars"];
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const selectedOption = useSelector((state: any) => state.CustomSelect.selectedOption);
  console.log(selectedOption, "hi")

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://film24-org-by-codevision.onrender.com/api/movies`
        );
        console.log("Request successful", response.data.movies);
        // console.log(response.data.results);
        setData(response.data.movies);
        return response.data.movies;
      } catch (error) {
        console.error("Request failed", error);
        throw error;
      }
    };
    fetch();
  }, [page]); // <-- Use [page] as the dependency

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=1ca93d75b94136d96a48b22202fa8f52`
  //       );
  //       setListGanres(response.data.genres);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  interface Movie {
    name: string;
    original_title: string;
    _id: number;
    release_date: string;
    image: any;
  }
  const prevPage = async () => {
    try {
      setPage(page > 1 ? page - 1 : 1); // Ensure page is never less than 1
      await fetch("");
    } catch (error) {
      console.error("Request failed", error);
      throw error;
    }
  };

  const nextPage = async () => {
    try {
      setPage(page + 1);
      await fetch("");
    } catch (error) {
      console.error("Request failed", error);
      throw error;
    }
  };
  return (
    <div>
      
      <div className="container">
        <ul className="flex w-full mt-10 items-center ">
          {/* <li className="w-[20%] px-4">
            <Select fetch={fetch} className="" options={genres} />
          </li> */}
          {/* <li className="w-[20%] px-4">
            <Select options={languages} />
          </li>
          <li className="w-[20%] px-4">
            <Select options={year} />
          </li>
          <li className="w-[20%] px-4">
            <Select options={duration} />
          </li>
          <li className="w-[20%] px-4">
            <Select options={rate} />
          </li> */}
        </ul>
      </div>
      <div className="container my-14">
        <h1 className="my-10 text-2xl text-white font-medium">
          Total{" "}
          <span className="underline decoration-sky-500 font-light">
            {data?.length ? data.length : "0"}
          </span>{" "}
          items Found
        </h1>
        <div className="flex flex-wrap justify-between mt-10 gap-y-10 ">
          {data.length > 0 ? (
            data.map((movie: Movie, index: number) => (
              <Link
                to={`/movie/${movie._id}`}
                className="text-white flex flex-col items-center relative justify-center group shadow-2xl duration-200 w-[100px] xl:w-[220px] 2xl:w-[275px]"
                key={index}
              >
                <img
                  className="group-hover:shadow-[#505454] w-full duration-300 h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl object-cover group-hover:scale-105 shadow-3xl"
                  src={movie.image.url}
                  alt=""
                />
                {/* <div className="w-full group-hover:bg-black/70 group-hover:scale-105 duration-300 h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl absolute top-0"></div> */}
                <div className="group-hover:shadow-[#505454] flex flex-col justify-center items-center shadow-3xl group-hover:scale-105 rounded-xl duration-500 h-[100px] w-full mt-5 p-3 bg-[#171818] ">
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
            ))
          ) : (
            <Loader />
          )}
        </div>
        <div className="m-auto mt-14 text-center">
          <button
            onClick={prevPage}
            className="rotate-90 bg-[#1f2020] active:scale-90 h-10 rounded-full mr-2 shadow-2xl  justify-center items-center w-10"
          >
            <AiOutlineArrowDown className="inset-0 text-white m-auto" />
          </button>

          <button
            onClick={nextPage}
            className="-rotate-90 bg-[#1f2020] active:scale-90 shadow-white h-10 rounded-full ml-2  justify-center items-center w-10"
          >
            {" "}
            <AiOutlineArrowDown className="inset-0 text-white m-auto" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
