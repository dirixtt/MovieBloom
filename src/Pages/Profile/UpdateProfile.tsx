import { useState } from "react";
import FetchUser from "../../hooks/FetchUser";
import axios from "axios";
import Loader from "../../Components/Loader";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/Login";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Alert } from "@mui/material";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState<any>();
  const { user, userLoading, userError } = FetchUser();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const [credentials] = useState({
    fullName: user?.fullName,
    email: user?.email,
  });

  async function handleDelete() {
    try {
      setLoading(true);
      const response = await axios({
        method: "DEL",
        url: "https://film24-org-by-codevision.onrender.com/api/users",
        data: "",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      dispatch(login(null));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleUptade = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "PUT",
        url: "https://film24-org-by-codevision.onrender.com/api/users",
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      response.status == 200
        ? setMsg("Profilingiz tahrirlandi")
        : setMsg("Profilingiz tahrirlanmadi");
      dispatch(login(response.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {userError && <div>Error</div>}
      {userLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={credentials}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleUptade}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              <h1 className="text-white text-xl font-semibold">Profile</h1>
              <div>
                <div className="mt-5">
                  <ul className="flex justify-between w-[80%]">
                    <li>
                      <h1 className="text-white font-light">Full Name</h1>
                      <Field
                        className="bg-[#63636371] outline-none mt-2 h-10 w-[300px] text-white px-3 py-1 rounded border"
                        name="fullName"
                        type="text"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="bg-red-200 text-red-700 rounded px-1.5 flex items-center gap-1"
                      />
                    </li>
                    <li>
                      <h1 className="text-white font-light">Email</h1>
                      <Field
                        className="bg-[#63636371] outline-none h-10 mt-2 w-[300px] text-white px-3 py-1 rounded border"
                        name="email"
                        type="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="bg-red-200 text-red-700 rounded px-1.5 flex items-center gap-1"
                      />
                    </li>
                  </ul>
                  <div className="w-[80%] flex gap-7 justify-end">
                    <button
                      onClick={handleDelete}
                      className="bg-red-700 active:scale-95 duration-150 shadow-xl text-white h-10 px-3 rounded mt-5"
                    >
                      {loading ? "Loading" : "  Delete Profile"}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid || !dirty}
                      className="bg-[#63636371] active:scale-95 duration-150 shadow-xl border text-white h-10 px-3 rounded mt-5"
                    >
                      {loading ? "Loading" : "Update Profile"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
      <div className="absolute -top-3 -right-6">
        {msg && (
          <Alert
            severity="info"
            onClose={() => {
              setMsg(null);
            }}
          >
            {msg}
          </Alert>
        )}
      </div>
    </div>
  );
}
