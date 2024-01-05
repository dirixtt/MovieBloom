import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCategory } from "../reducers/Params";
export default function Footer() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "your_token_here"; // Replace with your actual token
        const response = await axios.get(
          `https://film24-org-by-codevision.onrender.com/api/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  interface Genre {
    _id: number;
    title: string;
  }
  const dispatch = useDispatch();
  const onClick = (id: any) => {
    dispatch(updateCategory(id));
    window.scrollTo(0, 0);
  };
  return (
    <div className=" bg-[#1f2020] text-white">
      <div className="flex-col container md:flex-row flex justify-between items-center border-b py-10">
        <div className="flex flex-col justify-start items-start w-full">
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
        <div className="flex w-full justify-between mt-10">
          {data && (
            <div>
              <h1 className="text-xl mb-3 font-medium">Top Categories</h1>
              <ul className="leading-8 flex gap-x-5  flex-col h-44 flex-wrap text-white/70">
                {data.slice(0, 10).map((i: Genre) => (
                  <button
                    className="hover:text-white cursor-pointer text-left"
                    key={i._id}
                    onClick={() => onClick(i._id)}
                  >
                    {i.title}
                  </button>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h1 className="text-xl mb-3 font-medium">About us</h1>
            <ul className="leading-8 flex flex-col text-white/70">
              <Link to="/contact" className="hover:text-white cursor-pointer">
                Contacts
              </Link>
              <Link to="/contact" className="hover:text-white cursor-pointer">
                Support
              </Link>
              <Link to="/contact" className="hover:text-white cursor-pointer">
                Remove ads
              </Link>
              <Link to="/about" className="hover:text-white cursor-pointer">
                About Company
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="container py-3 flex w-full justify-between">
        <p className="hidden md:flex">
          © «iTV» Interactive television. All rights reserved. 2023 v1.13.8
        </p>
        <ul className="flex justify-end flex-col md:flex-row w-1/2 gap-4">
          <li>Русский</li>
          <li>O'zbekcha</li>
          <li>English</li>
        </ul>
      </div>
    </div>
  );
}
