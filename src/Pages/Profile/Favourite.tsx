import { useSelector } from "react-redux";
import Cards from "../../Components/Cards";
import { useState } from "react";

export default function Favourite() {
  const { favourite, favouriteFail } = useSelector(
    (state: any) => state.Favourite
  );
  if (favouriteFail) {
    return <p>Error</p>;
  }
  const [loading, setLoading] = useState(false)
  return (
    <div className="text-white">
      <h1 className="text-xl font-semibold">Siz Yoqtirgan Filmlar</h1>

      {favourite.length > 0 ? (
        <>
          <Cards movies={favourite} grid={"3"} loading={loading} />
        </>
      ) : (
        <div>Sizda hali yoqtirgan filmar yo'q</div>
      )}
    </div>
  );
}
