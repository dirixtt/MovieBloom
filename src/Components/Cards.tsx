import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { TbMovieOff } from "react-icons/tb";
interface Movie {
  name: string;
  original_title: string;
  _id: number;
  release_date: string;
  image: any;
}

export default function Cards(props: any) {
  const { movies, loading }: any = props;

  return (
    <div >
      {loading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid grid-cols-5 w-full gap-5 md:grid-cols-5">
          {movies?.map((movie: Movie, index: number) => (
            <Link
              to={`/movie/${movie._id}`}
              className="text-white mt-10 flex flex-col items-center relative justify-center group shadow-2xl duration-200  md:w-[100px] w-[100px] xl:w-[220px] 2xl:w-[275px]"
              key={index}
            >
              {/* Movie details */}
              <img
                className="group-hover:shadow-[#505454] w-full duration-300 md:h-[115px] h-[215px] xl:h-[280px] 2xl:h-[320px] rounded-xl object-cover group-hover:scale-105 shadow-3xl"
                src={movie.image.url}
                alt=""
              />
              <div className="group-hover:shadow-[#505454] flex flex-col justify-center items-center shadow-3xl group-hover:scale-105 rounded-xl duration-500 h-[100px] w-full mt-5 p-3">
                <div className="xl:text-[15px] md:text-[10px] 2xl:text-md">
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
      ) : (
        <div className="w-full justify-center h-[200px] flex items-center flex-col text-xl text-white">
          <TbMovieOff /> <p>No Movies</p>
        </div>
      )}
    </div>
  );
}
