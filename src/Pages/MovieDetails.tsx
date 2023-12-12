import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import moment from "moment";
import Footer from "../Components/Footer";
import { AiFillStar } from "react-icons/ai";
import { Alert } from "@mui/material";

export default function MovieDetails() {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const [details, setDetails] = useState<Details>();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const token: string | null = localStorage.getItem("token");

  const [msg, setMsg] = useState<any>();
  const [type, setType] = useState<any>("error");
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

    reviews: object[];
    category: any;
    genre: Genres[];
    desc: string;
    language: object[];
    year: string;
    rate: number;
  }
  useEffect(() => {
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
      setType("info")
      setMsg(error?.response.data.message);
      setLoading1(false)
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            className="flex my-10 justify-center shadow-3xl items-center h-[600px] w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7)), url(${details?.titleImage?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container items-center flex justify-start">
              <div className="">
                <img
                  className="h-[500px] rounded-xl object-cover w-[350px]"
                  src={details?.image.url}
                  alt=""
                />
              </div>
              <div className="text-white text-md   ml-10">
                <h1 className="text-3xl mb-5">{details?.name}</h1>
                <ul className="flex gap-5 text-white/50 ">
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
                <p className="my-5 w-[500px]">{details?.desc}</p>
                <ul>
                  <li>
                    Til:{" "}
                    <span className="mx-1">
                      {details?.language.map((l: any) => l.name).join(", ")}
                    </span>
                  </li>
                  <li>
                    Taqdimot kuni: <span>{details?.year}</span>{" "}
                  </li>
                  <li>Baho: {details?.rate}</li>
                  <li>Kategoriya: {details?.category[0].title}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container my-10 text-white">
            <h1 className="text-3xl font-[500]">Rewiew</h1>
            <div className="bg-[#1f2020] py-14 justify-center mt-6 rounded w-full flex-row md:flex">
              <div className="w-[45%]">
                <h1 className="text-2xl font-semibold">
                  Reaview of "{details?.name}"
                </h1>
                <p className="w-[70%] my-5 text-white/50">
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
                      {value.rating
                        ? `You rated: ${value.rating}/5`
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
              <div className="w-[45%]">
                <h1>Reviews</h1>
                <div>
                  {details?.reviews.map((i: any) => (
                    <div className="my-5 bg-[#333333] py-1 px-2  ">
                      <div className="flex items-center gap-2">
                        <h6 className="text-sm">{i.userName}:</h6>
                        <div className="flex">
                          {[...Array(5)].map((_, number) => (
                            <AiFillStar
                              key={i + 1}
                              className={`text-2xl  ${
                                i?.rating && i.rating >= number
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex">
                        <p className="">{i.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
      <Footer />
    </div>
  );
}
