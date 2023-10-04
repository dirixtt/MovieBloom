import { BiSearchAlt2, BiSolidHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function Header() {
  const likes: any = useSelector((state: any) => state.count);
  const linkStyle = "hover:bg-white/10 px-3 duration-300 h-full flex rounded-md justify-center items-center"
  return (
    <div className="container">
      <div className="h-20 shadow-md text-white justify-between w-full items-center flex">
        <div>
          <h1 className="text-3xl">BLOOM</h1>
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
          <ul className="flex h-[55px] items-center">
            <li className="gap-5 2xl:gap-14 flex h-full justify-center items-center">
              <Link className={linkStyle} to="">Movies</Link>
              <Link className={linkStyle} to="">About Us</Link>
              <Link className={linkStyle} to="">Contact Us</Link>
              <Link className={linkStyle} to="">Movies</Link>
            </li>
          </ul>
          <div className="flex text-2xl ml-10 items-center gap-6">
            <Link to="">
              <BsPerson />
            </Link>
            <Link to="" className="relative">
              <BiSolidHeart />
              <p className="text-sm absolute top-1/2 left-5">{likes.count}</p>
            </Link>
            
            <BiSearchAlt2 />
          
          </div>
        </div>
      </div>
    </div>
  );
}
