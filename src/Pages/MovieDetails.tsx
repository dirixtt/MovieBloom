import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiFillStar } from "react-icons/ai";
import { Alert } from "@mui/material";
import { BiHeart, BiLoader, BiPlay } from "react-icons/bi";
import { Button, Skeleton } from "antd";
import FetchUser from "../hooks/FetchUser";
import Vimeo from "https://cdn.skypack.dev/@u-wave/react-vimeo";

import MoviesSlide from "../Components/MovieSlide";
const ReviewItem = ({ userName, rating, comment }: any) => (
  <div className="my-5 bg-[#333333] py-1 px-2" key={userName}>
    <div className="flex items-center gap-2">
      <h6 className="text-sm">{userName}:</h6>
      <div className="flex">
        {[...Array(5)].map((_, number) => (
          <AiFillStar
            key={number}
            className={`text-2xl ${
              rating && rating >= number ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
    <div className="flex">
      <p>{comment}</p>
    </div>
  </div>
);
export default function MovieDetails() {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const { user } = FetchUser();
  const [details, setDetails] = useState<Details>();
  const [likeLoading, setLikeLoading] = useState(false);
  const token: string | null = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [msg, setMsg] = useState<any>();
  const [type, setType] = useState<any>("error");
  const [play, setplay] = useState<boolean>(false);
  interface ValueType {
    rating: number;
    comment: string;
  }
  const [value, setValue] = useState<ValueType>({
    rating: 0,
    comment: "",
  });
  interface Details {
    titleImage: any;
    image: any;
    name: string;
    time: number;
    casts: object[];
    reviews: any;
    category: any;
    genre: Genres[];
    desc: string;
    language: object[];
    year: string;
    rate: number;
  }
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/movies/${id}`
      );
      setDetails(response.data);
      console.log(response.data);

      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]); // Include 'id' as a dependency so that it fetches data when 'id' changes

  interface Genres {
    id: number;
    name: string;
  }

  const handleStarClick = (rating: number) => {
    // Handle star rating here, you can send it to the server or update it in your local state.
    setValue({ ...value, rating: rating });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AiFillStar
          key={i}
          onClick={() => handleStarClick(i)}
          className={`cursor-pointer text-2xl h-10 ${
            value.rating && value.rating >= i
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };
  const duration = moment.duration(details?.time, "minutes");
  const hours = Math.floor(duration.asMinutes() / 60);
  const minutes = Math.round(duration.asMinutes() % 60);

  const submitReview = async () => {
    try {
      setLoading1(true);
      const response: any = await axios.post(
        `https://film24-org-by-codevision.onrender.com/api/movies/${id}/reviews`,
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetails(response.data);
      console.log(response.data);
      setType("success");
      setMsg(response?.message);
      setLoading1(false); // Set loading to false once data is fetched
    } catch (error: any) {
      setType("info");
      setMsg(error?.response.data.message);
      setLoading1(false);
    } finally {
      fetchData();
    }
  };

  const onLike = async () => {
    if (token) {
      console.log(token);
      try {
        setLikeLoading(true);

        const response = await axios.post(
          `https://film24-org-by-codevision.onrender.com/api/users/favorites/`,
          {
            data: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setLikeLoading(false);
      } catch (error: any) {
        console.log(error.response.data);
        setLikeLoading(false);
        setError(error?.response?.data?.message);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="fixed top-3 right-2">
        {error && (
          <Alert
            severity="error"
            onClose={() => {
              setError(null);
            }}
          >
            {error}
          </Alert>
        )}
      </div>
      {loading && (
        <div className="h-screen container inset-0 m-0 flex w-full items-center justify-center">
          <Skeleton active avatar paragraph={{ rows: 10 }} />
        </div>
      )}
      {!loading && (
        <div>
          <div className={play ? "block" : 'hidden'}>
            <Vimeo
              video="348614459"
              controls={true}
              className="w-full mt-10 flex justify-center items-center"
              playerOptions={{
                id: 348614459,
                autopause: false,
                transparent: true,
              }}
            />
          </div>
          <div
            className="flex my-10 justify-center shadow-3xl items-center py-10 w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7)), url(${details?.titleImage?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container items-center flex-col md:flex-row flex justify-start">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  className="h-[500px] object-cover w-[500px]"
                  src={details?.image?.url}
                  alt=""
                />
                <button
                  onClick={onLike}
                  className="text-white group text-2xl top-0 right-2 shadow-md p-2 absolute bg-red-600"
                >
                  {likeLoading ? (
                    <BiLoader />
                  ) : (
                    <BiHeart
                      className={
                        user?.likedMovies?.includes(id)
                          ? "group-hover:scale-125 duration-200 text-red-600"
                          : "group-hover:scale-125 duration-200"
                      }
                    />
                  )}
                </button>
              </div>
              <div className="text-white w-full mt-10 md:mt-0 text-sm md:text-md md:ml-10">
                <h1 className="text-xl md:text-3xl mb-5">{details?.name}</h1>
                <ul className="flex gap-5 text-white/50">
                  <li>
                    {hours} soat {minutes > 0 ? `${minutes} minutes` : ""}
                  </li>

                  <li className="flex gap-3">
                    {details?.genre?.map((i: Genres) => (
                      <li key={i.id}>
                        <Link
                          className="hover:text-white text-white/50 duration-200"
                          to={`/genre/${i.id}`}
                        >
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </li>
                </ul>
                <p className="my-5 md:w-[500px]">{details?.desc}</p>
                <ul>
                  <li>
                    Til:{" "}
                    <span className="mx-1">
                      {details?.language?.map((l: any) => l.name).join(", ")}
                    </span>
                  </li>
                  <li>
                    Taqdimot kuni: <span>{details?.year}</span>{" "}
                  </li>
                  <li>Baho: {details?.rate}</li>
                  <li>
                    Kategoriya:{" "}
                    {details?.category && details?.category[0]?.title}
                  </li>
                  <li>
                    <button onClick={() => setplay(true)} className="rounded text-xl bg-neutral-800 font-mono font-semibold py-2 px-3 mt-3 items-center gap-2 flex"> Ko'rish<BiPlay/></button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container flex-col flex text-white gap-5">
            <h1 className="text-3xl font-[500]">Casts</h1>
            <div className="flex flex-wrap">
              {details?.casts.map((cast: any) => (
                <Link
                  to={`/cast/${cast._id}`}
                  className="hover:bg-white/10 duration-300 rounded p-5"
                >
                  <img
                    className="w-24 object-cover rounded-full aspect-square"
                    src={cast.image.url}
                    alt={cast.name}
                  />
                  <div className="mt-3 font-semibold text-sm text-white/50">
                    <h4>{cast.name}</h4>
                    <h4>{cast.surname}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="container my-10 text-white">
            <h1 className="text-3xl font-[500]">Rewiew</h1>
            <div className="bg-[#1f2020] px-2 py-14 justify-center mt-6 rounded w-full flex-row md:flex">
              <div className="md:w-[45%]">
                <h1 className="text-2xl font-semibold">
                  Reaview of "{details?.name}"
                </h1>
                <p className="md:w-[70%] my-5 text-white/50">
                  Write a review for this movie. It will be posted on this page.
                  lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                </p>
                <div className="my-5">
                  <h1 className="text-2xl font-semibold mb-2">
                    Rate this movie:
                  </h1>
                  <div className="flex flex-col justify-center">
                    <p className="flex ">{renderStars()}</p>
                    <p className="text-white/50">
                      {value?.rating
                        ? `You rated: ${value?.rating}/5`
                        : "Select a rating"}
                    </p>
                  </div>
                </div>
                <div className="flex-col w-full flex">
                  <textarea
                    className="min-h-[200px] focus:shadow-3xl rounded-lg bg-[#333333] min-w-[70%] p-3 font-mono text-xl outline-none"
                    name="mess"
                    id=""
                    onChange={(e: any) =>
                      setValue({ ...value, comment: e.target.value })
                    }
                  ></textarea>
                  <button
                    onClick={submitReview}
                    type="submit"
                    className="rounded mt-5 h-10 outline-none active:scale-95 duration-200 hover:shadow-3xl bg-[#333333] "
                  >
                    {loading1 ? "Loading..." : "submit"}
                  </button>
                </div>
              </div>
              <div className="mt-10 md:mt-0 md:w-[45%]">
                {details?.reviews.length > 0 ? (
                  <>
                    <h1>Reviews</h1>
                    <div>
                      {details?.reviews.map((review: any) => (
                        <ReviewItem key={review.userName} {...review} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {" "}
                    <p>no reviews yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="fixed top-10 right-10">
            {msg && (
              <Alert
                severity={type}
                onClose={() => {
                  setMsg(null);
                }}
              >
                {msg}
              </Alert>
            )}
          </div>
        </div>
      )}
      {!loading && (
        <div className="container text-white">
          <h1 className="text-3xl font-[500]">Fimiliar movies</h1>

          <MoviesSlide genre={details?.genre} loading={loading} />
        </div>
      )}
    </div>
  );
}
