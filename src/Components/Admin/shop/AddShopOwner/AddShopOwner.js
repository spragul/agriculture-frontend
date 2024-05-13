import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Inputs from "../../../Input/Input";
import { Button } from "@mui/material";
import { backendurl } from "../../../../Backendlink";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//adduser schema
const adduserSchema = yup.object({
  email: yup.string().email().required("Enter valid Email id"),
  role: yup.string().min(5, "select owner/market").max(6,"select owner/market").required("select valid owner/market"),
});

function AddShopOwner() {
  const navigate = useNavigate();
  let token=sessionStorage.getItem("token")
  async function addowner({ owner }) {
    console.log(owner);
    const userdata = {
      name: "user",
      email: owner.email,
      mobile: "0123456789",
      land: 0,
      role:owner.role,
      password: "user1234",
    };
    console.log(userdata);
    try {
      let response = await axios.post(`${backendurl}/user/addadmin`, userdata,{ headers: {"Authorization" : `Bearer ${token}`}});
      if (response.data.rd == true) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        role: "",
      },
      validationSchema: adduserSchema,
      onSubmit: (owner) => {
        console.log(owner);
        addowner({ owner });
      },
    });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Inputs
          names="email"
          types="email"
          lables="Emali id "
          values={values.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors.email}
          touched={touched.email}
        />

        <div>
          <select
            sx={{ mt: 3, mb: 2 }}
            value={values.role}
            onBlur={handleBlur}
            onChange={handleChange}
            names="role"
            id="role"
            className="dropdown-select"
          >
            <option>Select User type</option>
            <option >owner</option>
            <option  >market</option>
          </select>
          {touched.role && errors.role ? (
              <p className="error-p">{errors.role}</p>
            ) : (
              ""
            )}
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add user
        </Button>
      </form>
    </div>
  );
}

export default AddShopOwner;
