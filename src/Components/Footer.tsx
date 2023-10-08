import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=1ca93d75b94136d96a48b22202fa8f52`
        );
        setData(response.data.genres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  interface Genre {
    id: number;
    name: string;
  }

  return (
    <div className=" bg-[#1f2020] text-white">
      <div className=" flex justify-between items-center border-b  container px-5 py-10">
        <div>
          <img
            src="https://netflixo-ten.vercel.app/images/logo.png"
            className="h-24 text-center"
          />
          <h1 className="">
            Lorem ipsum dolor sit amet,
            <br /> consectetur adipisicing{" "}
          </h1>
          <p className="mt-4">info@Film24.com</p>
        </div>
        <div>
          <h1 className="text-xl mb-3 font-medium">Top Categories</h1>
          <ul className="leading-8 flex gap-x-5  flex-col h-44 flex-wrap text-white/70">
            {data.slice(0, 10).map((i: Genre) => (
              <Link to={`/genre/${i.id}`} className="hover:text-white cursor-pointer" key={i.id}>
                {i.name}
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="text-xl mb-3 font-medium">About us</h1>
          <ul className="leading-8 text-white/70">
            <li className="hover:text-white cursor-pointer">Contacts</li>
            <li className="hover:text-white cursor-pointer">Support</li>
            <li className="hover:text-white cursor-pointer">Remove ads</li>
            <li className="hover:text-white cursor-pointer">About Company</li>
          </ul>
        </div>
      </div>
      <div className="container px-0 py-3 flex justify-between">
          <p>
        © «iTV» Interactive television. All rights reserved. 2023 v1.13.8
          </p>
          <ul className="flex gap-4">
            <li>Русский</li>
            <li>O'zbekcha</li>
            <li>English</li>
          </ul>
      </div>
    </div>
  );
}
