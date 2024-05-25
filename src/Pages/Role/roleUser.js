import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Inputs from "../../Components/Input/Input";
import { Button } from "@mui/material";
import { backendurl } from "../../Backendlink";
import Sidebar from "../../Components/sidebar/sidebar";

const userSchema = yup.object({
  name: yup
    .string()
    .min(3, "Enter minmum 3 characters")
    .required("Enter your Name"),
  mobile: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  land: yup.number(),
});

export default function UpdateUser({oneuser}) {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");

  //add market/woner
  async function datasend({ userdata }) {
    try {
      console.log(userdata);
      let response = await axios.put(`${backendurl}/user/adduser`, userdata, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  //formik controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: oneuser.name,
        email: oneuser.email,
        mobile: oneuser.mobile,
        land: oneuser.land,
      },
      validationSchema: userSchema,
      onSubmit: (userdata) => {
        console.log(userdata);
        datasend({ userdata });
      },
    });

  return (
      <div className="role-container">
        <div className="role-card">
          <div className="role-text-area">
            <h1>welcome</h1>
            <p>Update User</p>
          </div>
          {oneuser ? (
            <form onSubmit={handleSubmit} className="role-form">
              <Inputs
                names="name"
                types="text"
                lables="Enter Your Name"
                values={values.name}
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors.name}
                touched={touched.name}
              />
              <Inputs
                names="mobile"
                types="number"
                lables="Mobile Number"
                values={values.mobile}
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors.mobile}
                touched={touched.mobile}
              />
              <Inputs
                names="land"
                types="number"
                lables="Enter land size in cents "
                values={values.land}
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors.land}
                touched={touched.land}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                submit
              </Button>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
  );
}
