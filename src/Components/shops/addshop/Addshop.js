import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Inputs from "../../Input/Input";
import axios from "axios";
import { backendurl } from "../../../Backendlink";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addsd } from "../../../Redux/shopSlice";
import Sidebar from "../../sidebar/sidebar";
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
    .max(10, 'Must be exactly 10 digits')
});

function Addshop() {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  //add shop details backend
  async function addshopdetails({ shop }) {
    try {
      let response = await axios.post(`${backendurl}/shop/adddata`, shop, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        console.log(response.data.newShop);
        dispatch(addsd(response.data.newShop));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        shopname: "",
        Address: "",
        mobile: 0,
      },
      validationSchema: shopSchema,
      onSubmit: (shop) => {
        console.log(shop);
        addshopdetails({ shop });
      },
    });
  return (
    <Sidebar>
      <div className="shop-container">
        <div className="shop-textpart">
          <h1>Add Shop Deatils</h1>
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
            Add Shop
          </Button>
        </form>
      </div>
    </Sidebar>
  );
}

export default Addshop;
