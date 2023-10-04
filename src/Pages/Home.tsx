import Footer from '../Components/Footer.tsx'
import Header from '../Components/Header'
import Popular from '../Components/Popular.jsx'
import Slider from '../Components/Slider.tsx'
import Tv from '../Components/Tv.tsx'

export default function Home() {
  return (
    <div className='bg-[#171818]'>
        <Header/>
        <Slider/>
        <Popular/>
        <Tv/>
        <Footer/>
    </div>
  )
}
