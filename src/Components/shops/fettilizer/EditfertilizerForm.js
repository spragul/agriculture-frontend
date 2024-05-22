import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import Sidebar from "../../sidebar/sidebar";
import Inputs from "../../Input/Input";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editfp } from "../../../Redux/fpSlice";
import { toast } from "react-toastify";
import { backendurl } from "../../../Backendlink";
import axios from "axios";

//fertilizer schema
const fertilizerschema = yup.object({
  fpName: yup
    .string()
    .min(3, "minmum 3 characters")
    .required("Enter Fertilizer and Pesticides"),
  fpPrice: yup.number().required("Enter price of fertilizer and pesticides"),
  fpImage: yup.string().required("Enter Image Url"),
  fpDiscription: yup
    .string()
    .min(15, "minmum 15 characters")
    .required("Enter Fertilizer Discription"),
});

function EditfertilizerForm({ datas }) {
  console.log(datas)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //Edit data
  async function editdatafp({ fpdata }) {
    try {
      const response = await axios.put(`${backendurl}/fp/editfp`, fpdata, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.rd == true) {
        toast.success(response.data.message);
        dispatch(editfp(response.data.fertilizers));
        navigate(`/shop/list`);
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
        _id:datas._id,
        fpName: datas.fpName,
        fpPrice: datas.fpPrice,
        fpImage: datas.fpImage,
        fpDiscription: datas.fpDiscription,
      },
      validationSchema: fertilizerschema,
      onSubmit: (fpdata) => {
        editdatafp({ fpdata });
      },
    });

  return (
    <div className="fp-container">
      <div className="fp-textpart">
        <h1>Edit Fertilizer And Pesticides Deatils</h1>
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
          Edit Fertilizer
        </Button>
      </form>
    </div>
  );
}

export default EditfertilizerForm;
