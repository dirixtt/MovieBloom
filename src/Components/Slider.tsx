import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMovieData } from "../reducers/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { AiFillStar } from "react-icons/ai";
import { HiPlay } from "react-icons/hi";
import { BiSolidHeart, BiHeart } from "react-icons/bi";
import { like } from "../reducers/count";

import { Autoplay, EffectFade } from "swiper/modules";
export default function Slider() {
  const dispatch = useDispatch();
  const movieData = useSelector((state: any) => state.movieData);
  const [liked, setLiked] = useState(true);
  const handleLike = () => {
    setLiked(!liked)
    dispatch(like());
  };
  useEffect(() => {
    dispatch(fetchMovieData());
  }, [dispatch]);

  if (movieData.loading) {
    return <div>Loading...</div>;
  }

  if (movieData.error) {
    return <div>Error: {movieData.error.message}</div>;
  }

  const results = movieData.data ? movieData.data.results : [];

  return (
    <div className="bg-[#171818] pt-5 container  text-white">
      {results.length > 0 ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          effect={"fade"}
          modules={[EffectFade, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {results.map((item: any) => (
            <SwiperSlide className="shadow-md" key={item.id}>
              <div>
                <img
                  className="w-full rounded-2xl overflow-hidden h-96 object-cover"
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt=""
                />
                <p className="text-white gap-2 flex rounded-s-none items-center bg-red-500 rounded-3xl px-3 py-1 text-xl absolute top-5 ">
                  {item.title} | {item.vote_average} <AiFillStar />
                </p>
                <button className="text-white gap-2 flex items-center bg-red-500 rounded-3xl px-3 py-1 text-xl absolute top-16 rounded-s-none ">
                  <HiPlay />
                  Watch
                </button>
                <button
                  className="text-white gap-2 flex items-center bg-red-500 rounded-3xl px-3 py-1 text-2xl absolute top-[108px] rounded-s-none "
                  onClick={handleLike}
                >
                  {liked ? <BiHeart /> : <BiSolidHeart />}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>No movie data available.</div>
      )}
    </div>
  );
}
