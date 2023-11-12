import { BsPhone } from "react-icons/bs";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { CiLocationOn, CiMail } from "react-icons/ci";
export default function ContactUs() {
  return (
    <div>
      <Header />
      <div className="text-white flex flex-col my-32 justify-center items-center">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-4xl font-serif ">Contact Us</h1>
          <p className="w-[40%] mt-4 text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
            corrupti tenetur consectetur, enim ab veritatis delectus quisquam
            vel, vitae repellendus neque quas ducimus earum itaque expedita
            nesciunt necessitatibus inventore alias?
          </p>
        </div>
        <ul className="flex mt-20 gap-52">
          <li className="flex flex-col justify-center items-center">
            <CiLocationOn className="text-[70px] font-thin"/>
            <h1  className="my-5 font-serif text-2xl text-white/60">ADDRES</h1>
            <p>27 13 Lowe Haven</p>
          </li>
          <li className="flex flex-col justify-center items-center">
            <BsPhone className="text-[70px] font-thin" />
            <h1 className="mt-5 font-serif text-2xl text-white/60">PHONE</h1>
            <p className="mt-5">+998 91 026-12-61</p>
          </li>
          <li className="flex flex-col justify-center items-center">
            <CiMail className="text-[70px] font-thin" />
            <h1  className="my-5 font-serif text-2xl text-white/60">EMAIL</h1>
            <p>bloom@info.com</p>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}
