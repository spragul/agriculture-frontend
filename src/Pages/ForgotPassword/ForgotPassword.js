import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import "./ForgotPassword.css";
import { backendurl } from "../../Backendlink";
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate,Link} from "react-router-dom"

//forgot schema
const forgotPasswordSchema = yup.object({
  email: yup.string().email().required("Enter youer valid email"),
});

export function Forgot() {
  const navigate =useNavigate()
  //
  async function fogotpassword({usermail}) {
    try {
      let response =await axios.post(`${backendurl}/user/forgotpassword`,usermail);
      console.log(response)
      if(response.data.rd==true){
        toast.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPasswordSchema,
      onSubmit: (usermail) => {
        console.log(usermail);
        fogotpassword({usermail})
      },
    });

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <div className="forgot-icon">
          <FaLock size={100} />
        </div>
        <form className="forgot-text" onSubmit={handleSubmit}>
          <h1>FORGOT PASSWORD</h1>
          <h3>You can rest your passwrd here.</h3>
          <div className="forgot-input">
            <label htmlFor="#forgot">Email Address</label>
            <input
              id="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              name="email"
              placeholder="Email Address"
            />
            {touched.email && errors.email ? (
              <p className="forgot-error-p">{errors.email}</p>
            ) : (
              ""
            )}
          </div>
        
          <Button variant="contained" type="submit" className="forgot-button">
            Reset Password
          </Button>
          <div className="know">
            <Link to={'/login'}>Already you know password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
