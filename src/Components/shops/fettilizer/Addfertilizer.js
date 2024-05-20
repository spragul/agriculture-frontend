import React from "react";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { backendurl } from "../../../Backendlink";
import { useDispatch } from "react-redux";
import { addfp } from "../../../Redux/fpSlice";
import Sidebar from "../../sidebar/sidebar";
import Inputs from "../../Input/Input";
import { Button } from "@mui/material";

//fertilizer schema
const fertilizerschema = yup.object({
  fpName: yup
    .string()
    .min(3, "minmum 3 characters")
    .required("Enter Fertilizer and Pesticides"),
  fpPrice: yup.number().required("Enter price of fertilizer and pesticides"),
  fpImage: yup.string().required("Enter Image Url"),
  fpDiscription: yup.string().min(15, "minmum 15 characters").required("Enter Fertilizer Discription"),
});

function Addfertilizer() {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  //add data to backend
  async function adddatafp({ fpdata }) {
    try {
      const response = await axios.post(
        `${backendurl}/fp/addfp/${id}`,
        fpdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        dispatch(addfp(response.data.newfertilizer));
        navigate(`/shop/details/${id}`)
      } else {
        toast.error(response.data.message);
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
        fpName: "",
        fpPrice: "",
        fpImage: "",
        fpDiscription: "",
      },
      validationSchema: fertilizerschema,
      onSubmit: (fpdata) => {
        console.log(fpdata);
        adddatafp({ fpdata });
      },
    });

  return (
    <Sidebar>
      <div className="fp-container">
        <div className="fp-textpart">
          <h1>Add Fertilizer And Pesticides Deatils</h1>
        </div>
        <form onSubmit={handleSubmit} className="fp-form">
          <Inputs
            names="fpName"
            types="text"
            lables="Enter Fertilizer Name"
            values={values.fpName}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.fpName}
            touched={touched.fpName}
          />
          <Inputs
            names="fpPrice"
            types="number"
            lables="Enter Fertilizer price"
            values={values.fpPrice}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.fpPrice}
            touched={touched.fpPrice}
          />
          <Inputs
            names="fpImage"
            types="url"
            lables="EnterImage Url"
            values={values.fpImage}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.fpImage}
            touched={touched.fpImage}
          />
          <Inputs
            names="fpDiscription"
            types="text"
            lables="Enter fertilizer discription"
            values={values.fpDiscription}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.fpDiscription}
            touched={touched.fpDiscription}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Fertilizer
          </Button>
        </form>
      </div>
    </Sidebar>
  );
}

export default Addfertilizer;
