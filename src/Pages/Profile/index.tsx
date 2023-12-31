import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import UpdateProfile from "./UpdateProfile";
import Favourite from "./Favourite";
import FetchUser from "../../hooks/FetchUser";

import Loader from "../../Components/Loader";
import ChangePass from "./ChangePass";
import Dashboard from "./Dashboard";
import Category from "./Category";
import Edit from "./Edit";
import Genre from "./Genre";
import Users from "./Users";
import Casts from "./Casts";
import CreateMovie from "./CreateMovie";
import Movies from "./Movies";

export default function Index() {
  const { user, userLoading } = FetchUser();
  const token = localStorage.getItem("token");

  if (userLoading) {
    return <Loader />;
  }
  if (!token || !user) {
    return <Navigate to="/login" />;
  } 
  
  

  return (
    <>
      <div className="container min-h-[600px] flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="container md:ml-10 py-5 my-10 rounded border bg-[#1f2020]">
            <Routes>
              <Route index element={<UpdateProfile />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/changepassword" element={<ChangePass />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/genre" element={<Genre />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/users" element={<Users />} />
              <Route path="/createmovie" element={<CreateMovie />} />
              <Route path="/casts" element={<Casts />} />
              <Route path="/liked" element={<Favourite />} />
              <Route path="/dashboard/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
