import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function AboutUs() {
  return (
    <div className="w-full">
      
      <div className="container w-full h-72 relative mt-10 rounded overflow-hidden">
        <img className="rounded-lg h-full" src="https://netflixo-ten.vercel.app/images/head.png" alt="" />
        <h1 className="absolute text-5xl z-20 h-full flex justify-center items-center font-semibold text-center inset-0  w-full  text-white">About</h1>
      </div>
      <div className="container my-10 items-center justify-between w-full flex text-white">
        <div className="w-[48%]">
            <h1 className="font-semibold text-3xl my-3">Welcome to our Netflixo</h1>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
        </div>
        <div className="w-[48%]">
            <img className="rounded-lg" src="https://netflixo-ten.vercel.app/images/about2.jpg" alt="" />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
