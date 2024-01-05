import { NavLink, useNavigate } from "react-router-dom";
import FetchUser from "../../hooks/FetchUser";
import { Avatar } from "antd";
import { BiBookOpen, BiCategoryAlt, BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/Login";
import { MdOutlineFingerprint, MdOutlineSpaceDashboard } from "react-icons/md";
import { TbUserStar, TbUserUp } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi";
import { FaFilm, FaRegHeart } from "react-icons/fa";
import { IoMdFilm, IoMdMenu } from "react-icons/io";
import { useState } from "react";
export default function Sidebar() {
  const [open, isOpened] = useState<Boolean>(true);
  interface Route {
    id: number;
    link: string;
    label: any;
    icon: any;
    admin: boolean;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = FetchUser();
  const routes: Route[] = [
    {
      id: 0,
      link: "./dashboard",
      icon: <MdOutlineSpaceDashboard />,
      label: "Dashboard",
      admin: true,
    },
    {
      id: 1,
      link: "./categories",
      icon: <BiCategoryAlt />,
      label: "Kategoriyalar",
      admin: true,
    },
    {
      id: 2,
      link: "./genre",
      icon: <BiBookOpen />,
      label: "Janrlar",
      admin: true,
    },
    {
      id: 3,
      link: "./",
      icon: <TbUserUp />,
      label: "Profilni Yangilash",
      admin: false,
    },
    {
      id: 4,
      link: "./users",
      icon: <HiOutlineUsers />,
      label: "Foydalanuvchilar",
      admin: true,
    },
    {
      id: 5,
      link: "./casts",
      icon: <TbUserStar />,
      label: "Aktyorlar",
      admin: true,
    },
    {
      id: 6,
      link: "./changepassword",
      icon: <MdOutlineFingerprint />,
      label: "Parolni Uzgartirish",
      admin: false,
    },
    {
      id: 7,
      link: "./createmovie",
      icon: <FaFilm />,
      label: "Film Yaratish",
      admin: true,
    },
    {
      id: 8,
      link: "./movies",
      icon: <IoMdFilm />,
      label: "Filmlar Ro'yhati",
      admin: true,
    },
    {
      id: 9,
      link: "./liked",
      icon: <FaRegHeart />,
      label: "Favourite",
      admin: false,
    },
  ];
  const active =
    "text-black rounded flex items-center gap-2 font-[500] px-2 py-2 text-xl bg-[#fffdfdf6]";
  const noActive =
    "text-white bg-[#302f2f] flex items-center gap-2 hover:bg-[#262828] duration-200 shadow-lg rounded font-[500] px-2 py-2 text-xl";

  const route = () => {
    return user?.isAdmin
      ? routes
      : routes.filter((rout: any) => rout?.admin == false);
  };

  const onLogout = () => {
    localStorage.clear();
    dispatch(login(null));
    navigate("/login");
  };
  return (
    <div className=" my-10 ">
      <ul className={`border  rounded bg-[#1f2020] px-3 text-white py-5 gap-4 flex flex-col ${!open && "w-16"}`}>
        <li className={open ? "text-right" : "text-center"}>
          <button onClick={() => isOpened(!open)} className="text-2xl">
            <IoMdMenu />
          </button>
        </li>
        <li className="flex gap-3 items-center">
          {" "}
          <Avatar
            className="text-xl"
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          >
            {user?.fullName.slice(0, 1)}
          </Avatar>
          {open && (
            <>
              <div className="flex flex-col ">
                <h1 className="text-lg">{user?.fullName}</h1>
                <h5 className="text-sm">{user?.email}</h5>
              </div>
              <button onClick={onLogout} className="text-xl">
                <BiLogOut />
              </button>
            </>
          )}
        </li>
        {route().map((i: Route) => (
          <NavLink
            key={i.id}
            className={({ isActive }) => (isActive ? active : noActive)}
            to={i.link}
          >
            <p>{i.icon}</p>
            {open && <p>{i.label}</p>}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
