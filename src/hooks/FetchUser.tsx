import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login , LoginFailture} from "../reducers/Login";
const token = localStorage.getItem("token");
const logged = token ? true : false;

const useFetchUser = () => {
  const { user, error } = useSelector((state: any) => state.Login);
  const [loading, setLoading] = useState(false);
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
        setLoading(false);
      } catch (error) {
        dispatch(LoginFailture(error));
        setLoading(false);
      }
    };

    token && !user && fetchData();
  }, [dispatch, user]);

  return { user, userLoading: loading, userError: error, logged };
};

export default useFetchUser;
