import React from "react";
import Inputs from "./Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button } from "@mui/material";
import "./Addshop.css"                                                  

const userSchema = yup.object({
  names: yup
    .string()
    .min(3, "Enter minmum 3 characters")
    .required("Enter your Name"),

  email: yup.string().email().required("Enter your email"),
  shopname: yup
    .string()
    .min(3, "Shop name minmum 3 characters")
    .required("Enter Shop Name"),
});
function Form() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        names: "",
        email: "",
        shopname: "",
      },
      validationSchema: userSchema,
      onSubmit: (userdata) => {
        console.log(userdata);
      },
    });
  return (
    <div>
      <div>
        <h1>Add Fertilizer pesticide shop</h1>
        <p>Add shop Owner details here</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Inputs
          names="shopname"
          types="text"
          lables="Enter Shop Name "
          values={values.shopname}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors.shopname}
          touched={touched.shopname}
        />
        <Inputs
          names="names"
          types="text"
          lables="Enter Shop Owner name"
          values={values.names}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors.names}
          touched={touched.names}
        />
        <Inputs
          names="email"
          types="email"
          lables="Emali id "
          values={values.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors.email}
          touched={touched.email}
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
  );
}

export default Form;
