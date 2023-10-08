import { Link, useParams } from "react-router-dom";
import Header from "../Components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import moment from "moment";
import Footer from "../Components/Footer";
import { AiFillStar } from "react-icons/ai";

export default function MovieDetails() {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const [details, setDetails] = useState<Details>();
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState<number | null>(null);

  interface Details {
    backdrop_path: string;
    poster_path: string;
    original_title: string;
    runtime: number;
    budget: number;
    genres: Genres[];
    overview: string;
    spoken_languages: object[];
    release_date: string;
    vote_average: number;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=1ca93d75b94136d96a48b22202fa8f52`
        );
        setDetails(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Include 'id' as a dependency so that it fetches data when 'id' changes

  console.log(details);
  interface Genres {
    id: number;
    name: string;
  }

  const handleStarClick = (rating: number) => {
    // Handle star rating here, you can send it to the server or update it in your local state.
    setUserRating(rating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AiFillStar
          key={i}
          onClick={() => handleStarClick(i)}
          className={`cursor-pointer text-2xl h-10 ${
            userRating && userRating >= i ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            className="flex my-10 justify-center shadow-3xl items-center h-[600px] w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/w500/${details?.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container items-center flex justify-start">
              <div className="">
                <img
                  className="h-[500px] rounded-xl w-[350px]"
                  src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
                  alt=""
                />
              </div>
              <div className="text-white text-md   ml-10">
                <h1 className="text-3xl mb-5">{details?.original_title}</h1>
                <ul className="flex gap-5 text-white/50 ">
                  <li>{details?.runtime} min</li>
                  <li>{details?.budget}$</li>
                  <li className="flex gap-3">
                    {details?.genres.map((i: Genres) => (
                      <li key={i.id}>
                        <Link
                          className="hover:text-white duration-200"
                          to={`/genre/${i.id}`}
                        >
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </li>
                </ul>
                <p className="my-5 w-[500px]">{details?.overview}</p>
                <ul>
                  <li>
                    Til:{" "}
                    {details?.spoken_languages.map(
                      (i: any, index: number, array: any[]) => (
                        <span key={i.iso_639_1} className="mx-1">
                          {i.english_name}
                          {index < array.length - 1 && ","}
                        </span>
                      )
                    )}
                  </li>
                  <li>
                    Taqdimot kuni:{" "}
                    <span>{moment(details?.release_date).format("LL")}</span>{" "}
                  </li>
                  <li>Taqdimot kuni: {details?.vote_average.toFixed(1)}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container my-10 text-white">
            <h1 className="text-3xl font-[500]">Rewiew</h1>
            <div className="bg-[#1f2020] py-14 justify-center mt-6 rounded w-full flex-row md:flex">
              <div className="w-[45%]">
                <h1 className="text-2xl font-semibold">
                  Reaview of "{details?.original_title}"
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
                      {userRating
                        ? `You rated: ${userRating}/5`
                        : "Select a rating"}
                    </p>
                  </div>
                </div>
                <form className="flex-col w-full flex">
                  <textarea className="min-h-[200px] focus:shadow-3xl rounded-lg bg-[#333333] min-w-[70%] p-3 font-mono text-xl outline-none" name="mess" id=""></textarea>
                  <button className="rounded mt-5 h-10 outline-none active:scale-95 duration-200 hover:shadow-3xl bg-[#333333] ">submit</button>
                </form>
              </div>
              <div className="w-[45%]">
                <h1>Reviews</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
