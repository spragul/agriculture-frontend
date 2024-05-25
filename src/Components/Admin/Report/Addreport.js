import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import Sidebar from "../../sidebar/sidebar";
import Inputs from "../../Input/Input";
import { Button } from "@mui/material";
import axios from "axios";
import { backendurl } from "../../../Backendlink";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addsoil } from "../../../Redux/soilSclice";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

//Add schema
const reportSchema = yup.object({
  soiltest: yup
    .string()
    .min(3, "Enter minmum 3 characters")
    .required("Enter Soil Test Name"),
  soiluser: yup.string().required("Enter Report Geting person Id"),
  submittedby: yup
    .string()
    .min(3, "Enter minmum 3 characters")
    .required("Enter Report inchrage Name"),
  testreportdate: yup.date().required("Test submitting date"),
  reportdetails: yup.string().required("Enter Test Details"),
});

function Addreport() {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("myid");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function addsoildetails({ soil }) {
    console.log(soil);
    const soiladd = {
      soiltest: soil.soiltest,
      submittedby: soil.submittedby,
      testreportdate: soil.testreportdate,
      reportdetails: soil.reportdetails,
    };
    let idss = soil.soiluser;
    try {
      const response = await axios.post(
        `${backendurl}/soilreport/addsr/${idss}`,
        soiladd,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        dispatch(addsoil(response.data.newsoil));
        navigate("/report/list");
      }
    } catch (error) {
      toast.success(error.response.data.message);
    }
  }
  //form controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        soiltest: "",
        soiluser: "",
        submittedby: "",
        testreportdate: "",
        reportdetails: "",
      },
      validationSchema: reportSchema,
      onSubmit: (soil) => {
        console.log(soil);
        addsoildetails({ soil });
      },
    });
  return (
    <Sidebar>
      <div className="Soil-add-container">
        <div className="Soil-add-textpart">
          <h1>Add Soil Report Deatils</h1>
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
            names="soiluser"
            types="text"
            lables="Enter test report getting person id"
            values={values.soiluser}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors.soiluser}
            touched={touched.soiluser}
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
            Add Soil Report
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/report/list")}
            startIcon={<ArrowBackIosNewIcon />}
          >
            back
          </Button>
        </form>
      </div>
    </Sidebar>
  );
}

export default Addreport;
