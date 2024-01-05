import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons
import { Alert } from "@mui/material";

// import FetchUser from "../../hooks/FetchUser";

const PasswordChangeForm = () => {
  //   const { user, userLoading, userError } = FetchUser();
  const token: string | null = localStorage.getItem("token");
  
  const [msg, setMsg] = useState<any>();
  const [type, setType] = useState<any>("error");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const validationSchema: any = Yup.object().shape({
    oldPassword: Yup.string().required("Previous password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirm: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response: any = await axios({
        method: "PUT",
        url: "https://film24-org-by-codevision.onrender.com/api/users/password",
        data: values, // Use the form values here
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setType("success")
      setMsg(response?.data?.message);
      console.log(response);
      //   dispatch(login(response.data));
    } catch (error: any) {
        setType("error")
      console.error(error);
      setMsg(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirm: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <div className="text-white relative">
          <h1 className="text-white text-xl font-semibold">Change Password</h1>

          <Form className="flex flex-col mt-5 gap-2">
            <label htmlFor="oldPassword">Old Password</label>
            <div className="flex md:w-[300px] relative items-center">
              <Field
                type={showConfirm ? "text" : "password"}
                name="oldPassword"
                className="bg-[#63636371] w-full outline-none h-10 mb-3 mt-2 md:w-[300px] text-white px-3 py-1  rounded border "
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-white absolute right-2 px-2h-10 mb-3 mt-2 "
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors?.oldPassword && touched?.oldPassword ? (
              <div className="bg-red-200/90 text-red-700 rounded px-1.5 md:w-[300px] flex items-center gap-1">
                {errors.oldPassword}
              </div>
            ) : null}

            <label htmlFor="newPassword">New Password</label>
            <div className="flex relative md:w-[300px] items-center">
              <Field
                type={showPass ? "text" : "password"}
                name="newPassword"
                className="bg-[#63636371] outline-none h-10 mb-3 mt-2 w-full text-white px-3 py-1 rounded border "
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-white absolute right-2 h-10 mb-3 mt-2 "
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors?.newPassword && touched?.newPassword ? (
              <div className="bg-red-200/90 text-red-700 rounded px-1.5 md:w-[300px] flex items-center gap-1">
                {errors.newPassword}
              </div>
            ) : null}

            <label htmlFor="confirm">Confirm Password</label>
            <div className="flex items-center">
              <Field
                type="password"
                name="confirm"
                className="bg-[#63636371] outline-none h-10 mb-3 mt-2 md:w-[335px] text-white px-3 py-1 rounded border"
                placeholder="******"
              />
            </div>
            {errors?.confirm && touched?.confirm ? (
              <div className="bg-red-200/90 text-red-700 rounded px-1.5 md:w-[300px] flex items-center gap-1">
                {errors.confirm}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={
                errors.oldPassword || errors.newPassword || errors.confirm
                  ? true
                  : false
              }
              className={`bg-[#63636371]  duration-150 shadow-xl border text-white h-10 px-3 rounded mt-5 ${
                errors.oldPassword ||
                errors.newPassword ||
                errors.confirm ||
                !touched.oldPassword ||
                !touched.newPassword ||
                !touched.confirm
                  ? "disabled-class"
                  : "active:scale-95"
              }`}
            >
              {loading || isSubmitting ? "Loading" : "Update Password"}
            </button>
          </Form>
          <div className="absolute top-0 right-0">
            {msg && (
              <Alert
                severity={type}
                onClose={() => {
                  setMsg(null);
                }}
              >
                {msg}
              </Alert>
            )}
          </div>
        </div>
      )}
    </Formik>
  );
};

export default PasswordChangeForm;
