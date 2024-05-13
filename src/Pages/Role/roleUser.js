import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Inputs from "../../Components/Input/Input";
import { Button } from "@mui/material";
import { backendurl } from "../../Backendlink";

const userSchema = yup.object({
  name: yup
    .string()
    .min(3, "Enter minmum 3 characters")
    .required("Enter your Name"),
  email: yup.string().email().required("Enter your email"),
  mobile: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  land: yup.number(),
});

export default function UpdateUser() {
  const navigate = useNavigate();
  //add market/woner
  async function datasend({ userdata }) {
    try {
      console.log(userdata);
      let response = await axios.put(`${backendurl}/user/adduser`, userdata);
      console.log(response)
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
        name: "",
        email: "",
        mobile: "",
        land: 0
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
        <form onSubmit={handleSubmit}>
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
            names="email"
            types="email"
            lables="Enter Your email"
            values={values.email}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.email}
            touched={touched.email}
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
      </div>
    </div>
  );
}
