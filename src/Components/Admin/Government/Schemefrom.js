import { useFormik } from "formik";
import React from "react";
import * as yup from "yup"
import Inputs from "../../Input/Input";
import { Button } from "@mui/material";
import Sidebar from "../../sidebar/sidebar";
import { editgs } from "../../../Redux/governmentSlice";
import { backendurl } from "../../../Backendlink";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"

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
function Schemefrom({datas}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
    async function editgovernmentdata({government}){
        try {
            const response = await axios.put(
              `${backendurl}/government/editgs`,
              government,
              { headers: { "Authorization": `Bearer ${token}` } }
            );
            console.log(response);
            if (response.data.rd === true) {
              toast.success(response.data.message);
              dispatch(editgs(response.data.governments));
              navigate("/scheme/list");
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
        _id:datas._id,
        schemename:datas.schemename,
        image:datas.image,
        details: datas.details,
        discription: datas.discription,
        startingdate: datas.startingdate,
      },
      validationSchema: governmentSchema,
      onSubmit: (government) => {
        console.log(government);
        editgovernmentdata({ government });
      },
    });
  return (
      <div className="government-container">
        <div className="government-text-container">
          <h2>Edit Government Scheme</h2>
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
            Edit scheme
          </Button>
        </form>
      </div>
  );
}

export default Schemefrom;
