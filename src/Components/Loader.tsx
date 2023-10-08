
import { TailSpin } from 'react-loader-spinner'
export default function Loader() {
  return (
    <div className='w-full justify-center flex items-center min-h-[220px] h-full'>
      <TailSpin
        height="50"
        width="50"
        color="#fff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
