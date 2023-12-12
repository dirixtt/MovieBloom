import { NavLink } from "react-router-dom";

export default function Sidebar() {
  interface Route {
    id: number;
    link: string;
    label: string;
  }
  const routes: Route[] = [
    {
      id: 0,
      link: "./dashboard",
      label: "Dashboard",
    },
    {
      id: 7,
      link: "./createmovie",
      label: "Create Novie",
    },
    {
      id: 5,
      link: "./casts",
      label: "Casts",
    },
    {
      id: 8,
      link: "./movies",
      label: "Movie List",
    },
    {
      id: 1,
      link: "./categories",
      label: "Category",
    },
    {
      id: 2,
      link: "./genre",
      label: "Genre",
    },
    {
      id: 3,
      link: "./",
      label: " Update Profile",
    },
    {
      id: 4,
      link: "./users",
      label: "Users",
    },

    {
      id: 6,
      link: "./changepassword",
      label: "Change Password",
    },
  ];

  const active =
    "text-black rounded font-[500] px-2 py-2 text-xl bg-[#fffdfdf6]";
  const noActive =
    "text-white bg-[#302f2f] shadow-lg rounded font-[500] px-2 py-2 text-xl";
  return (
    <div className="h-[250px] my-10 ">
      <ul className="border rounded bg-[#1f2020] px-3 text-white py-5 gap-5 flex flex-col">
        {routes?.map((i: Route) => (
          <NavLink
            key={i.id}
            className={({ isActive }) => (isActive ? active : noActive)}
            to={i.link}
          >
            {i.label}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
