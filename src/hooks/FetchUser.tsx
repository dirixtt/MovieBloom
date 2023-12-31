import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, LoginFailture } from "../reducers/Login";
const token = localStorage.getItem("token");

const useFetchUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [logged, setLogged] = useState(false);
  const { user, error } = useSelector((state: any) => state.Login);
  const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://film24-org-by-codevision.onrender.com/api/users/user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(res.data);
          dispatch(login(res.data));
          setLogged(true);
          setLoading(false);
        } catch (error: any) {
          dispatch(LoginFailture(error?.message));
          setLogged(false);
          setLoading(false);
        }
      };

      token && !user && fetchData();
    }, [user]);
  

  return { user, userLoading: loading, userError: error, logged };
};

export default useFetchUser;
