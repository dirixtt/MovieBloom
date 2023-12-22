import { Link } from "react-router-dom";
import Loader from "./Loader";
import { Card } from "antd";
import { TbMovieOff } from "react-icons/tb";

interface Movie {
  name: string;
  original_title: string;
  _id: number;
  release_date: string;
  image: any;
  rate: number
}

const { Meta } = Card;

export default function Cards(props: any) {
  const { movies, loading }: any = props;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {movies?.map((movie: Movie, index: number) => (
            <Link
              to={`/movie/${movie._id}`}
              className="text-white group shadow-2xl duration-200 overflow-hidden relative"
              key={index}
            >
              <Card
                hoverable
                className="group overflow-hidden"
                cover={<img alt={movie.name} src={movie.image.url} className="h-64 object-cover w-full border group-hover:scale-110 duration-200" />}
              >
                <Meta
                  title={
                    movie.name
                      ? movie.name.length > 30 // устанавливаем максимальную длину текста
                        ? `${movie.name.substring(0, 30)}...`
                        : movie.name
                      : movie.original_title
                      ? movie.original_title.length > 30
                        ? `${movie.original_title.substring(0, 30)}...`
                        : movie.original_title
                      : "Unknown Title"
                  }
                  description={
                    <span className="truncate">
                     Reyting: {movie.rate}/5
                    </span>
                  }
                />
              </Card>
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
