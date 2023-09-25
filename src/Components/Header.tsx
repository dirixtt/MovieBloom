import { BiSearchAlt2, BiSolidHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { like } from "../reducers/count";

export default function Header() {
  const likes: number = useSelector((state: any) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="h-20 shadow-md text-white items-center flex">
        <div>
          <h1 className="text-3xl">BLOOM</h1>
        </div>
        <div className="flex ml-20 w-full justify-between">
          <div className="w-[450px] h-11 flex items-center overflow-hidden rounded-sm">
            <button className="w-14 border border-red-600 flex justify-center items-center text-center h-full p-0 m-0 bg-red-600">
              <BiSearchAlt2 />
            </button>
            <input
              type="text"
              className="w-full pl-1 text-black border-none outline-none h-full p-0 m-0"
              placeholder="Search Movie Name From here"
            />
          </div>
          <ul className="flex items-center">
            <li className="gap-20 flex items-center">
              <Link to="">Movies</Link>
              <Link to="">About Us</Link>
              <Link to="">Contact Us</Link>
              <Link to="">Movies</Link>
            </li>
          </ul>
          <div className="flex text-2xl items-center gap-10">
            <Link to="">
              <BsPerson />
            </Link>
            <Link to="" className="relative">
              <BiSolidHeart />
              <p className="text-sm absolute top-1/2 left-5">{likes}</p>
            </Link>
            <button onClick={() => dispatch(like())}>+</button> {/* Обратите внимание на () после like */}
          </div>
        </div>
      </div>
    </div>
  );
}
