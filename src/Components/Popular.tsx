import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
interface Movie {
  title: string;
  id: number;
  backdrop_path: string;
}

export default function Popular() {
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=4119957485d64dd2384b6dbe92f91fa1"
        );
        setPopular(response.data.results);
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty array means this effect runs once when the component mounts

  if (popular.length <= 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-white mt-14">
      <Link to="/popular" className="text-3xl flex font-sans ">
        Popular movies <IoIosArrowForward className="text-lg mt-3.5 ml-2" />{" "}
      </Link>
      <div className="mt-10 flex justify-between flex-wrap gap-y-10">
        {popular.map((movie: Movie, index: number) => (
          <div
            className="w-[330px] h-[350px] bg-[#2527279c] shadow-2xl rounded-xl  overflow-hidden"
            key={index}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt=""
            />
            <div className="text-white">
              <p>{movie.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
