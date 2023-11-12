import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import UpdateProfile from "./UpdateProfile";
import Favourite from "./Favourite";
import FetchUser from "../../hooks/FetchUser";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../Components/Loader";
import ChangePass from "./ChangePass";
import Dashboard from "./Dashboard";
import Category from "./Category";
import Edit from "./Edit";

export default function Index() {
  const { user, logged, userLoading, userError } = FetchUser();

  // const token: string = localStorage.get("token", user.token);
  // if (token) {
  //   localStorage.setItem("token", user.token);
  // }

  if (userLoading) {
    return <Loader />;
  }

  if ((!user && !logged) || userError) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="container flex">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="container min-h-[350px] ml-10 py-5 my-10 rounded border bg-[#1f2020]">
            <Routes>
              <Route index element={<UpdateProfile />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/changepassword" element={<ChangePass />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categoties" element={<Category />} />
              <Route path="/dashboard/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
