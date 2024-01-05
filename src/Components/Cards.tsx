import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { Card, Rate, Spin } from "antd";
import { TbMovieOff } from "react-icons/tb";
import { useCallback, useState } from "react";
import { BiHeart, BiLoader } from "react-icons/bi";
import useFetchUser from "../hooks/FetchUser";
import axios from "axios";
import { Alert } from "@mui/material";

interface Movie {
  name: string;
  original_title: string;
  _id: number;
  release_date: string;
  image: any;
  rate: number;
}

const { Meta } = Card;

export default function Cards(props: any) {
  const { movies, grid, loading }: any = props;
  const { user } = useFetchUser();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<any>(null);
  const [likeLoadingMap, setLikeLoadingMap] = useState<{
    [key: number]: boolean;
  }>({});

  const token: string | null = localStorage.getItem("token");
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const onLike = useCallback(
    async (id: number) => {
      if (token) {
        try {
          setLikeLoadingMap((prev) => ({ ...prev, [id]: true }));

          const response = await axios.post(
            `https://film24-org-by-codevision.onrender.com/api/users/favorites/`,
            { data: id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
        } catch (error: any) {
          console.log(error.response.data);
          setAlert(error?.response?.data?.message);
        } finally {
          setLikeLoadingMap((prev) => ({ ...prev, [id]: false }));
        }
      } else {
        navigate("/login");
      }
    },
    [token, navigate]
  );

  return (
    <div>
      <div className="fixed top-3 right-2">
        {alert && (
          <Alert
            severity="error"
            onClose={() => {
              setAlert(null);
            }}
          >
            {alert}
          </Alert>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div
          className={`grid grid-cols mt-10 grid-cols-${grid} md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
        >
          {movies?.map((movie: Movie, index: number) => (
            <div className="text-white z-10 my-2 group px-2 duration-200 overflow-hidden relative">
              <Link to={`/movie/${movie._id}`} className="" key={index}>
                <Card
                  hoverable
                  className="group overflow-hidden bg-[#393E46] border-none "
                  cover={
                    <>
                      <img
                        alt={movie.name}
                        src={movie.image?.url}
                        className="aspect-[1/1.2] overflow-hidden object-cover w-full group-hover:scale-110 duration-200"
                      />
                      {loading && (
                        <Spin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </>
                  }
                >
                  <Meta
                    title={
                      <h1 className="text-white">
                        {movie.name
                          ? movie.name.length > 30
                            ? `${movie.name.substring(0, 30)}...`
                            : movie.name
                          : movie.original_title
                          ? movie.original_title.length > 30
                            ? `${movie.original_title.substring(0, 30)}...`
                            : movie.original_title
                          : "Unknown Title"}
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
              {token && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from propagating to the Link component
                    onLike(movie._id);
                  }}
                  className="text-white group text-2xl top-0 right-2 shadow-md p-2 absolute z-50 bg-red-600"
                >
                  {likeLoadingMap[movie._id] ? (
                    <BiLoader />
                  ) : (
                    <BiHeart
                      className={
                        user?.likedMovies?.includes(movie._id)
                          ? "group-hover:scale-125 duration-200 text-red-600"
                          : "group-hover:scale-125 duration-200"
                      }
                    />
                  )}
                </button>
              )}
            </div>
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
