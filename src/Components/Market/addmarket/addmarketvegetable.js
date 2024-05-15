import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Inputs from "../../Input/Input";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../sidebar/sidebar";
import { useDispatch } from "react-redux";
import { addveg } from "../../data/vegetable";

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

export default function Addvegetable() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch=useDispatch();


  //connect in backend
  // async function addveg({ vegetable }) {
  //   console.log(vegetable)
  //   try {
  //     const response = await axios.post(`${backendurl}/vegetable/add`, vegetable, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     console.log(response);
  //     if (response.data.rd === true) {
  //       toast.success(response.data.message);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  //form controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        categories: "",
        image: "",
        price: 0,
      },
      validationSchema: vegetablesSchema,
      onSubmit: async(vegetable) => {
        let fcall=await addveg({vegetable},dispatch);
        if(fcall.responses){
          navigate("/list/vegetable");
          toast.success(fcall.response.data.message)
        }else{
          toast.success(fcall.error.response.data.message)
        }
      },
    });

  return (
    <Sidebar>
      <div>
        <div>
          <h1>Add Vegetable</h1>
          <p>Add vegetable details</p>
        </div>
        <form onSubmit={handleSubmit}>
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
            Add Vegetable
          </Button>
        </form>
      </div>
    </Sidebar>
  );
}
