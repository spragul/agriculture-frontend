import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./login.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { MdPerson } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import farmer from "./f4.jpg";
import { backendurl } from "../../Backendlink";

const userSchema = yup.object({
  email: yup.string().email().required("Enter your email"),
  password: yup.string().required("Enter your password"),
});
export default function Loginpage() {
  const [showpassword, setShowpassword] = useState("password");
  const navigate = useNavigate();

  //login backend
  const loginuser = async ({ userdata }) => {
    try {
      console.log(userdata);
      const response = await axios.post(`${backendurl}/user/login`, userdata);
      console.log(response);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("myname", response.data.myname);
        sessionStorage.setItem("myRole", response.data.myRole);
        sessionStorage.setItem("myid", response.data.myid);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }
  };

  //formik controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: (userdata) => {
        console.log(userdata);
        loginuser({ userdata });
      },
    });
  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="text-part">
          <ul>
            <li className="log-content">
              <h1>WELCOME </h1>
              <p>Login product webpage</p>
            </li>
            <li className="log-content">
              <label>
                <span>
                  <MdPerson size={20} />
                </span>
                Email
              </label>
              <input
                placeholder="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                name="email"
                className="login-input"
              />
              {touched.email && errors.email ? (
                <p style={{ color: "crimson" }}>{errors.email}</p>
              ) : (
                ""
              )}
            </li>
            <li className="log-content">
              <label>
                <span>
                  <FaLock size={20} />
                </span>
                PASSWORD
              </label>
              <div className="buttonIn">
                <input
                  name="password"
                  type={showpassword}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="password"
                  className="login-input "
                />
                {showpassword === "text" ? (
                  <button
                  type="button"
                    onClick={() => setShowpassword("password")}
                    className="input-button"
                  >
                    <MdVisibilityOff size={40} />
                  </button>
                ) : (
                  <button
                  type="button"
                    onClick={() => setShowpassword("text")}
                    className="input-button"
                  >
                    <MdVisibility size={40} />
                  </button>
                )}
                {touched.password && errors.password ? (
                  <p style={{ color: "crimson" }}>{errors.password}</p>
                ) : (
                  ""
                )}
              </div>
            </li>
            <li className="log-content">
              <Link to={"/forgotpassword"}>Forgot password</Link>
            </li>
            <li className="log-content-btn">
              <button className="log-dum-btn" type="submit" >
                Login
              </button>
            </li>
            <li className="log-content">
              <p className="mb-0">
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "black" }}>
                  Sign Up
                </Link>
              </p>
            </li>
          </ul>
        </div>
        <div className="image-container">
          <img className="login-img" src={farmer} title="logimg" alt="logimg" />
        </div>
      </form>
    </div>
  );
}
