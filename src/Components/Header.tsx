import { BiSearchAlt2, BiSolidHeart } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { BsPerson } from "react-icons/bs";

import FetchUser from "../hooks/FetchUser";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { favourite, favouriteFail } from "../reducers/Favourite";
import { MdClose, MdMenu } from "react-icons/md";
export default function Header() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [userliked, setuserliked] = useState<any>([]);
  const [opened, isOpened] = useState<boolean>(false);
  const { user } = FetchUser();
  const fetch = async () => {
    try {
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/users/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setuserliked(response.data);
      dispatch(favourite(response.data));
    } catch (error: any) {
      dispatch(favouriteFail(error.data));
    }
  };

  useEffect(() => {
    fetch();
  }, [token, user]);
  const activeLink =
    "bg-red-500/10 px-3 duration-300 h-full flex rounded-md justify-center items-center";
  const linkStyle =
    "hover:bg-white/10 px-3 duration-300 h-full flex rounded-md justify-center items-center";

  return (
    <div className=" shadow-xl">
      <div className="h-20 relative container text-white justify-between w-full items-center flex">
        <div>
          <Link to="/" className="text-3xl">
            BLOOM
          </Link>
        </div>
        <div className="xl:flex hidden ">
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
              {/* <NavLink
                className={(isActive: any) =>
                  isActive ? `${activeLink}  ` : `${linkStyle} `
                }
                to="/movies"
              >
                Movies
              </NavLink> */}
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : linkStyle
                }
                to="/about"
              >
                About Us
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeLink : linkStyle
                }
                to="/contact"
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="flex text-2xl ml-10 items-center gap-6">
            <NavLink to={"/profile/"}>
              {user ? (
                <BsPerson />
              ) : (
                <Button variant="contained" color="secondary">
                  Sign Up
                </Button>
              )}
            </NavLink>
            <NavLink to="/profile/liked" className="relative">
              <BiSolidHeart />
              <p className="text-sm absolute top-1/2 left-5">
                {userliked.length > 0 ? userliked.length : ""}
              </p>
            </NavLink>
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={() => isOpened(!opened)} className="text-2xl">
            <MdMenu />
          </button>
          {opened && (
            <div className="fixed text-white top-0 left-0 w-screen h-screen bg-[#222831] z-50 container ">
              <button
                onClick={() => isOpened(false)}
                className="text-2xl h-20 flex items-center"
              >
                <MdClose />
              </button>
              <div className="flex justify-around  items-center">
                <NavLink className="border w-1/2 py-2 text-center" to="/about">
                  About Us
                </NavLink>
                <NavLink
                  className="border w-1/2 py-2 text-center"
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </div>
              <div className="flex flex-col mt-5 w-full">
                <NavLink to={"/profile/"}>
                  {user ? (
                    <BsPerson />
                  ) : (
                    <Button className="w-full" variant="contained" color="secondary">
                      Sign Up
                    </Button>
                  )}
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
