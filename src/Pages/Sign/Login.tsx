import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../reducers/Login";
import Alert from "@mui/material/Alert";
import { FiEye, FiEyeOff } from "react-icons/fi";
// Define the validation schema using Yup
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password is too short")
    .max(50, "Password is too long")
    .required("Password is required"),
});

export default function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [msg, setMsg] = useState<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: any) => {
    if (msg) {
      setMsg(null);
    }

    try {
      setLoading(true);
      const response: any = await axios.post(
        "https://film24-org-by-codevision.onrender.com/api/users/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login successful", response.data);
      localStorage.setItem("token", response.data.token);

      // Dispatch the login action with user data
      dispatch(login(response.data));

      navigate("/");
    } catch (error: any) {
      setMsg(error?.response?.data?.message);

      // Set a timeout to clear the error message after, for example, 5 seconds (5000 milliseconds)
      const timeoutId = setTimeout(() => {
        setMsg(null); // Clear the error message after 5 seconds
      }, 500);

      // Make sure to clear the timeout if there's a new error or when the component unmounts
      clearTimeout(timeoutId);
    } finally {
      setLoading(false);
    }
  };

  const UserData = useSelector((state: any) => state.Login);
  console.log(UserData);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="md:w-[60%] w-[90%] flex-col xl:flex-row flex md:h-[70%] bg-gray-500 rounded-xl overflow-hidden m-auto">
        <div className="md:w-[40%] h-[150px] md:h-full bg-white">
          <img
            className="object-cover w-full h-full"
            src="https://avatars.mds.yandex.net/get-kinopoisk-image/10900341/a53caaa1-1b72-414b-a72b-4052b86fa2fe/384x384"
            alt=""
          />
        </div>

        <div className="md:w-[60%] p-5 flex flex-col items-center">
          <Formik
            initialValues={formValues}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setFormValues(values); // Update state with form values
              handleSubmit(values); // Handle form submission
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex rounded-xl mt-10 bg-white p-5 md:w-[80%] flex-col">
                
                <label htmlFor="email">Email</label>
                <Field
                  className="border my-2 px-2 rounded h-10 focus:bg-white outline-none bg-[#ececec]"
                  id="email"
                  name="email"
                  placeholder="john@acme.com"
                  type="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="bg-red-200/90 text-red-700 rounded px-1.5 flex items-center gap-1"
                />

                <label htmlFor="password">Password</label>
                <div className="flex w-full items-center">
                  <Field
                    className="border w-full my-2 px-2 rounded h-10 focus:bg-white outline-none bg-[#ececec]"
                    id="password"
                    name="password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-white px-2 rounded-e border-l-0 bg-[#63636371] border h-10 "
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="bg-red-200 text-red-700 rounded px-1.5 flex items-center gap-1"
                />

                <button
                  className="mt-3 rounded bg-[#ececec] duration-200 p-2 w-[35%]"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-white/70 text-center mt-10">
            Don't have an account yet? <br />
            <Link to="/register" className="text-white/90 underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute top-3 right-2">
        {msg && (
          <Alert
            severity="error"
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
