import { Link } from "react-router-dom";
import Loader from "./Loader";
import { Card, Rate } from "antd";
import { TbMovieOff } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

interface Movie {
  name: string;
  original_title: string;
  _id: number;
  release_date: string;
  image: any;
  genre: any;
  rate: number;
}

const { Meta } = Card;

export default function MoviesSlide(props: any) {
  const { genre, loading }: any = props;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>("");
  const [loading1, setLoading1] = useState<boolean>(loading);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
console.log(genre)
  const fetchMovies = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/movies?genre=${genre[0]?._id}`
      );
      const filtered: Movie[] = response.data.movies;
      setMovies(filtered);
    } catch (error) {
      console.error("Request failed", error);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading1(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [genre]);

  const renderMovieTitle = (title: string) => {
    return title.length > 30 ? `${title.substring(0, 30)}...` : title;
  };

  const swiperRef = useRef<any>(null);
  const handleNextButtonClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  
  const handlePrevButtonClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  return (
    <div>
      {loading1 ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <>
          <Swiper
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            }}
          >
            {movies?.map((movie: Movie, index: number) => (
              <SwiperSlide key={index}>
                <Link
                  to={`/movie/${movie._id}`}
                  className="text-white group p-2 duration-200 overflow-hidden relative"
                >
                  <Card
                    hoverable
                    className="group overflow-hidden bg-[#393E46] border-none "
                    cover={
                      <img
                        alt={movie.name}
                        src={movie.image.url}
                        className="aspect-[1/1.2] overflow-hidden object-cover w-full group-hover:scale-110 duration-200"
                      />
                    }
                  >
                    <Meta
                      title={
                        <h1 className="text-white">
                          {movie.name
                            ? renderMovieTitle(movie.name)
                            : renderMovieTitle(
                                movie.original_title || "Unknown Title"
                              )}
                        </h1>
                      }
                      description={
                        <span className="truncate text-white">
                          <Rate disabled tooltips={desc} value={movie.rate} />
                        </span>
                      }
                    />
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
         
          </Swiper>
          <div>
            <button onClick={handlePrevButtonClick}>Prev</button>
            <button onClick={handleNextButtonClick}>Next</button>
          </div>
        </>
      ) : (
        <div className="w-full justify-center h-[200px] flex items-center flex-col text-xl text-white">
          <TbMovieOff /> <p>No Movies</p>
        </div>
      )}
    </div>
  );
}
