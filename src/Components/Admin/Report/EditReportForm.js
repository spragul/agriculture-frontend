import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../../../Backendlink";
import { editsoil } from "../../../Redux/soilSclice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import Inputs from "../../Input/Input";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//soil schema
const addreportSchema = yup.object({
  soiltest: yup
    .string()
    .min("3", "Enter minmum 3 characters")
    .required("Enter Soil Test Name"),
  submittedby: yup
    .string()
    .min("3", "Enter minmum 3 characters")
    .required("Enter Report inchrage Name"),
  testreportdate: yup.date().required("Test submitting date"),
  reportdetails: yup.string().required("Enter Test Details"),
});

function EditReportForm({ datas }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  //Edit data backend
  async function editshopdata({ soil }) {
    try {
      const response = await axios.put(`${backendurl}/soilreport/editsr`, soil, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        dispatch(editsoil(response.data.soils));
        navigate("/report/list");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  //form controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        _id: datas._id,
        soiltest: datas.soiltest,
        submittedby: datas.submittedby,
        testreportdate: datas.testreportdate.split("T")[0],
        reportdetails: datas.reportdetails,
      },
      validationSchema: addreportSchema,
      onSubmit: (soil) => {
        console.log(soil);
        editshopdata({ soil });
      },
    });
  return (
    <div className="Soil-add-container">
      <div className="Soil-add-textpart">
        <h1>Edit Soil Report Deatils</h1>
      </div>
      <form onSubmit={handleSubmit} className="Soil-add-form">
        <Inputs
          names="soiltest"
          types="text"
          lables="Enter Soil Test Name"
          values={values.soiltest}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors.soiltest}
          touched={touched.soiltest}
        />
        <Inputs
          names="submittedby"
          types="text"
          lables="Enter Incharge Name"
          values={values.submittedby}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors.submittedby}
          touched={touched.submittedby}
        />
        <Inputs
          names="testreportdate"
          types="Date"
          lables="Enter test report date"
          values={values.testreportdate}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors.testreportdate}
          touched={touched.testreportdate}
        />
        <Inputs
          names="reportdetails"
          types="text"
          lables="Enter report details"
          values={values.reportdetails}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors.reportdetails}
          touched={touched.reportdetails}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Edit Soil Report
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained" 
          color="success"
          sx={{ mt: 3, mb: 2 }}
          onClick={()=>navigate("/report/list")}
          startIcon={<ArrowBackIosNewIcon />}
        >
          back
        </Button>
      </form>
    </div>
  );
}

export default EditReportForm;
