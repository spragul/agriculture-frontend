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

const shopSchema = yup.object({
  shopname: yup
    .string()
    .min(3, "minmum 3 characters only")
    .required("Enter Shop Name"),
  Address: yup
    .string()
    .min(20, "Enter full address")
    .required("Enter address with pinCode"),
  mobile: yup.number
    .min(10, "Enter mobile number without +91")
    .max(10, "Enter mobile number without +91")
    .required("enter mobile number"),
});

function EditShopForm({ datas }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Edit data backend
  async function editshopdata({ shop }) {
    try {
      const response = await axios.put(`${backendurl}/shop/editdata`, shop, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        dispatch(editsd(response.data.shop));
        navigate("/shop/list");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        shopname: datas.shopname,
        Address: datas.Address,
        mobile: datas.mobile,
      },
      validationSchema: shopSchema,
      onSubmit: (shop) => {
        console.log(shop);
        editshopdata({ shop });
      },
    });
  return (
      <div className="shop-form-container">
        <div className="shop-form-textpart">
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
