import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories, categoryFail } from "../reducers/categories";
const token = localStorage.getItem("token");

const useFetchCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { categ, error } = useSelector((state: any) => state.Category);
  const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://film24-org-by-codevision.onrender.com/api/categories`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(res.data);
          dispatch(Categories(res.data));
          setLoading(false);
        } catch (error: any) {
          dispatch(categoryFail(error?.message));
          setLoading(false);
        }
      };

      token && !categ && fetchData();
    }, [Categories]);
  

  return { Categories, Loading: loading, Error: error,  };
};

export default useFetchCategory;
