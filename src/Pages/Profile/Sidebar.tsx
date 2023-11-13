import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const active = "text-black rounded font-[500] px-2 py-2 text-xl bg-[#fffdfdf6]"
  const noActive = "text-white bg-[#302f2f] shadow-lg rounded font-[500] px-2 py-2 text-xl"
  return (
    <div className="h-[250px] my-10 ">
      <ul className="border rounded bg-[#1f2020] px-3 text-white py-5 gap-5 flex flex-col">
        <NavLink
          className={({ isActive }) =>
            isActive ? active : noActive
          }
          to="./dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? active : noActive
          }
          to="./categoties"
        >
          Category
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? active : noActive
          }
          to="./genre"
        >
          Genre
        </NavLink>
        <NavLink
          className={({ isActive }) =>
          isActive ? active : noActive
          }
          to="./"
        >
          Update Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
             isActive ? active : noActive
          }
          to="favourite"
        >
          Favorite Movie
        </NavLink>
        <NavLink
          className={({ isActive }) =>
             isActive ? active : noActive
          }
          to="changepassword"
        >
          Change Password
        </NavLink>
      </ul>
    </div>
  );
}
