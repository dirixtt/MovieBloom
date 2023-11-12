import { BiSearchAlt2, BiSolidHeart } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  const likes: any = useSelector((state: any) => state.count);
  const userToken = localStorage.getItem("token") || null;
  const [isLogged, setIsLogged] = useState<boolean>(userToken ? true : false);
  const [search, setSearch] = useState<string>("");

  const activeLink =
    "bg-red-500/10 px-3 duration-300 h-full flex rounded-md justify-center items-center";
  const linkStyle =
    "hover:bg-white/10 px-3 duration-300 h-full flex rounded-md justify-center items-center";

  return (
    <div className=" shadow-xl">
      <div className="h-20 container text-white justify-between w-full items-center flex">
        <div>
          <Link to="/" className="text-3xl">
            BLOOM
          </Link>
        </div>
        <div className="flex ">
          {/* <div className="w-[450px] h-11 flex items-center overflow-hidden rounded-md">
            <button className="w-14 text-xl border border-red-600 flex justify-center items-center text-center h-full p-0 m-0 bg-red-600">
              <BiSearchAlt2 />
            </button>
            <input
              type="text"
              className="w-full pl-1 text-black border-none outline-none h-full p-0 m-0"
              placeholder="Search Movie Name From here"
            />
          </div> */}
          <ul className="flex h-[55px] duration-200 items-center">
            <li className="gap-5 2xl:gap-8 flex h-full justify-center items-center">
              <NavLink
                className={(isActive: any) =>
                  isActive ? `${activeLink}  ` : `${linkStyle} `
                }
                to="/movies"
              >
                Movies
              </NavLink>
              <NavLink
                className={(isActive: any) =>
                  isActive ? `${activeLink}` : `${linkStyle} `
                }
                to="/about"
              >
                About Us
              </NavLink>
              <NavLink className={linkStyle} to="/contact">
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="flex text-2xl ml-10 items-center gap-6">
            <NavLink to={"/profile/"}>
              <BsPerson />
            </NavLink>
            <NavLink to="" className="relative">
              <BiSolidHeart />
              <p className="text-sm absolute top-1/2 left-5">{likes.count}</p>
            </NavLink>
            <NavLink
              to=""
              className="flex items-center overflow-hidden group relative"
            >
              <BiSearchAlt2 />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
