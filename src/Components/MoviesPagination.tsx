import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import { Pagination } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";

export default function MoviesPagination() {
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate:any = useNavigate();
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/movies?pageNumber=${page}`
      );
      console.log(response.data, page);
      setData(response.data.movies);
      setTotalPages(response.data.pages);
      navigate(`?page=${page}`)
    } catch (error) {
      console.error("Request failed", error);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  interface Movie {
    name: string;
    original_title: string;
    _id: number;
    release_date: string;
    image: any;
  }
  if (error) {
    return <>{error && <p style={{ color: "red" }}>{error}</p>} </>;
  }
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container text-white my-14">
          <Link
            to="/movies"
            className="text-3xl font-semibold m-auto  flex font-sans "
          >
            All movies <IoIosArrowForward className="text-lg mt-3.5 ml-2" />{" "}
          </Link>
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
          <div className="w-full flex justify-center mt-5 text-white">
            <Pagination
              color="secondary"
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
