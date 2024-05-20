import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Inputs from "../../Input/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { backendurl } from "../../../Backendlink";
import { editsd } from "../../../Redux/shopSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const shopSchema = yup.object({
  shopname: yup
    .string()
    .min(3, "minmum 3 characters only")
    .required("Enter Shop Name"),
  Address: yup
    .string()
    .min(20, "Enter full address")
    .required("Enter address with pinCode"),
    mobile: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
    branch:yup
    .string()
    .required("Enter Branch location")
});

function EditShopForm({ datas }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  //Edit data backend
  async function editshopdata({ shop }) {
    try {
      const response = await axios.put(`${backendurl}/shop/editdata`, shop, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        dispatch(editsd(response.data.shops));
        navigate("/shop/list");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        _id:datas._id,
        shopname: datas.shopname,
        Address: datas.Address,
        mobile: datas.mobile,
        branch:datas.branch
      },
      validationSchema: shopSchema,
      onSubmit: (shop) => {
        console.log(shop);
        editshopdata({ shop });
      },
    });
  return (
      <div className="shop-form-container">
        <div className="shop-textpart">
          <h1>Edit Shop Deatils</h1>
        </div>
        <form onSubmit={handleSubmit} className="shop-form">
          <Inputs
            names="shopname"
            types="text"
            lables="Enter Shop Name"
            values={values.shopname}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.shopname}
            touched={touched.shopname}
          />
          <Inputs
            names="Address"
            types="text"
            lables="Enter Full Address"
            values={values.Address}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.Address}
            touched={touched.Address}
          />
           <Inputs
            names="branch"
            types="text"
            lables="Enter Branch location"
            values={values.branch}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.branch}
            touched={touched.branch}
          />
          <Inputs
            names="mobile"
            types="number"
            lables="Enter Mobile Number"
            values={values.mobile}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.mobile}
            touched={touched.mobile}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </div>
  );
}

export default EditShopForm;
