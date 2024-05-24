import React from "react";
import Sidebar from "../../sidebar/sidebar";
import Inputs from "../../Input/Input";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendurl } from "../../../Backendlink";
import { addgs } from "../../../Redux/governmentSlice";
import axios from "axios"

//government schema
const governmentSchema = yup.object({
  schemename: yup
    .string()
    .min(3, "Enter minmum 3 charactors")
    .required("Enter scheme name"),
    image: yup.string().required("Enter Image Link"),
  details: yup
    .string()
    .min(3, "Enter minmum 3 charactors")
    .required("Enter scheme details"),
  discription: yup
    .string()
    .min(3, "Enter minmum 3 charactors")
    .required("Enter scheme discription"),
  startingdate: yup.date().required("scheme starting date date"),
});

function GovernmentSchemeAdd() {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Add government backend
  async function addgovernmentdata({ government }) {
    try {
      const response = await axios.post(
        `${backendurl}/government/addgs`,
        government,
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        dispatch(addgs(response.data.newgovernment));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  //form controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        schemename: "",
        details: "",
        image:"",
        discription: "",
        startingdate: "",
      },
      validationSchema: governmentSchema,
      onSubmit: (government) => {
        console.log(government);
        addgovernmentdata({ government });
      },
    });
  return (
    <Sidebar>
      <div className="government-container">
        <div className="government-text-container">
          <h2>Add Government Scheme</h2>
        </div>
        <form onSubmit={handleSubmit} className="government-form-container">
          <Inputs
            names="schemename"
            types="text"
            lables="Enter scheme name"
            values={values.schemename}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.schemename}
            touched={touched.schemename}
          />
          <Inputs
            names="details"
            types="text"
            lables="Enter scheme details"
            values={values.details}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.details}
            touched={touched.details}
          />
          <Inputs
            names="image"
            types="url"
            lables="Enter Vegetable Image URl"
            values={values.image}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.image}
            touched={touched.image}
          />
          <Inputs
            names="discription"
            types="text"
            lables="Enter scheme discription"
            values={values.discription}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.discription}
            touched={touched.discription}
          />
          <Inputs
            names="startingdate"
            types="date"
            lables="Enter scheme startingdate"
            values={values.startingdate}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.startingdate}
            touched={touched.startingdate}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add scheme
          </Button>
        </form>
      </div>
    </Sidebar>
  );
}

export default GovernmentSchemeAdd;
