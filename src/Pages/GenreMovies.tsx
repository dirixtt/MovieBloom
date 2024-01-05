import axios from "axios";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Loader from "../Components/Loader";
import { AiOutlineArrowDown } from "react-icons/ai";

export default function GenreMovies() {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const { id } = useParams();
  const [genreMap, setGenreMap] = useState<{ [key: number]: string }>({});
  const [currentGenreName, setCurrentGenreName] = useState<string>("");

  useEffect(() => {
    // Fetch the list of genres and create a mapping of genre IDs to genre names
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=1ca93d75b94136d96a48b22202fa8f52`
        );
        const genres = response.data.genres;
        const genreMapping: { [key: number]: string } = {};
        genres.forEach((genre: any) => {
          genreMapping[genre.id] = genre.name;
        });
        setGenreMap(genreMapping);

        // Set the current genre name
        if (id) {
          setCurrentGenreName(genreMapping[Number(id)]);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [id]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=1ca93d75b94136d96a48b22202fa8f52${
            id ? `&with_genres=${id}` : ""
          }`
        );
        console.log("Request successful");
        const movies = response.data.results.map((movie: any) => ({
          ...movie,
          genre_names: movie.genre_ids.map((genreId: number) => genreMap[genreId]),
        }));
        setData(movies);
        return response.data;
      } catch (error) {
        console.error("Request failed", error);
        throw error;
      }
    };
    fetch();
  }, [id, genreMap, page]);
  
  interface Movie {
    original_name: string;
    original_title: string;
    id: number;
    release_date: string;
    poster_path: string;
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
console.log(data)
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
      
      <div className="container my-14">
        <h1 className="my-10 text-2xl text-white font-medium">
          Total{" "}
          <span className="underline decoration-sky-500 font-light">
            {data?.length ? data.length : "0"}
          </span>{" "}
          items Found with genre <span className="underline decoration-sky-500 font-light">{currentGenreName}</span>
        </h1>
        <div className="flex flex-wrap justify-between mt-10 gap-y-10 ">
          {data.length > 0 ? (
            data.map((movie: Movie, index: number) => (
              <Link
                to={`/movie/${movie.id}`}
                className="text-white flex flex-col items-center relative justify-center group shadow-2xl duration-200 w-[100px] xl:w-[220px] 2xl:w-[275px]"
                key={index}
              >
                <img
                  className="group-hover:shadow-[#505454] w-full duration-300 h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl object-cover group-hover:scale-105 shadow-3xl"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
                {/* <div className="w-full group-hover:bg-black/70 group-hover:scale-105 duration-300 h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl absolute top-0"></div> */}
                <div className="group-hover:shadow-[#505454] flex flex-col justify-center items-center shadow-3xl group-hover:scale-105 rounded-xl duration-500 h-[100px] w-full mt-5 p-3 bg-[#222831] ">
                  <div className="xl:text-[15px] 2xl:text-md">
                    <p>
                      Title:{" "}
                      {movie.original_name
                        ? movie.original_name.length >= 15
                          ? movie.original_name.slice(0, 15) + "..."
                          : movie.original_name
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
      
    </div>
  );
}
