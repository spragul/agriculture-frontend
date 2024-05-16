import React from "react";
import Inputs from "../../Input/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { editVegetableData } from "../../data/vegetable";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

//vegetable schema
const vegetablesSchema = yup.object({
  name: yup
    .string()
    .min(3, "Enter minmum 3 charactors")
    .required("Enter vegetable name"),
  categories: yup
    .string()
    .min(3, "Enter minmum 3 charactors")
    .required("Enter Vegetable categories"),
  image: yup.string().required("Enter Image Link"),
  price: yup.number().required("Enter Vegetable price in rupees"),
});

function Editform({ datas }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        _id: datas._id,
        name: datas.name,
        categories: datas.categories,
        image: datas.image,
        price: datas.price,
      },
      validationSchema: vegetablesSchema,
      onSubmit: async (vegetable) => {
        let fcall = await editVegetableData({ vegetable }, dispatch);
        if (fcall.responses) {
          navigate("/list/vegetable");
          toast.success(fcall.response.data.message);
        } else {
          toast.success(fcall.error.response.data.message);
        }
      },
    });
  return (
    <div className="vegetable-container">
      <div className="vegetable-header">
        <h1>Edit Vegetable</h1>
        <p>Change vegetable details</p>
      </div>
      <form onSubmit={handleSubmit} className="vegetable-form-container">
        <Inputs
          names="name"
          types="text"
          lables="Enter vegetable name"
          values={values.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors.name}
          touched={touched.name}
        />
        <Inputs
          names="categories"
          types="text"
          lables="Enter vegetable categories"
          values={values.categories}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors.categories}
          touched={touched.categories}
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
          names="price"
          types="number"
          lables="Enter Vegetable price"
          values={values.price}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors.price}
          touched={touched.price}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Edit Vegetable
        </Button>
      </form>
    </div>
  );
}

export default Editform;
