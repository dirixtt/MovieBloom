import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { AiFillStar } from "react-icons/ai";
import { HiPlay } from "react-icons/hi";
import { BiSolidHeart, BiHeart } from "react-icons/bi";
import { like } from "../reducers/count";
import { Autoplay, EffectFade } from "swiper/modules";
import Loader from "./Loader";
import axios from "axios";

export default function Slider() {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState<any>([]);

  const handleLike = () => {
    setLiked(!liked);
    dispatch(like());
  };

  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true);
        const response: any = await axios.get(
          "https://film24-org-by-codevision.onrender.com/api/movies/random/all"
        );
        setMovieData(response.data)
      } catch (error) {
        console.error("Login failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData()
  });
  return (
    <div className="bg-[#171818] mt-5 container  text-white">
      {movieData?.length > 0 || !loading ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
        
          // effect={"fade"}
          // modules={[EffectFade]}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: true,
          // }}  
        >
          {movieData.map((item: any, index: number) => (
            <SwiperSlide className="shadow-md" key={index}>
              <div>
                <img
                  className="w-full rounded-2xl object-cover overflow-hidden h-96 "
                  src={`${item.titleImage.url}`}
                  alt=""
                />
                <p className="text-white gap-2 flex rounded-s-none items-center bg-red-500 rounded-3xl px-3 py-1 text-xl absolute top-5 ">
                  {item.name} | {item.rate} <AiFillStar />
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
        <Loader />
      )}
    </div>
  );
}
