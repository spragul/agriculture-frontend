import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate,Link} from "react-router-dom"
import "./signup.css"
import { backendurl } from "../../Backendlink";


const userSchema = yup.object({
  name: yup.string().min(3, "Enter minmum 3 characters").required("Enter your Name"),
  email: yup.string().email().required("Enter your email"),
  mobile: yup
  .string()
  .required()
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(10, 'Must be exactly 10 digits')
  .max(10, 'Must be exactly 10 digits'),
  land:yup.number().required("Enter land size in cents"),
  password: yup.string().required("Enter your password"),
});


export default function SignIn() {
const navigate =useNavigate()
  //userdata send backend
  async function datasend({userdata}){
    try {
      let response =await axios.post(`${backendurl}/user/signup`,userdata);
    if(response.data.rd==true){
      toast.success(response.data.message);
      navigate('/login');
    }else{
      toast.error(response.data.message);
    }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }


  //formik controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        mobile: "",
        land: 0,
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: (userdata) => {
        console.log(userdata);
        datasend({userdata})
      },
    });
  return (
    <div className="signup-container">
      <Container component="main" className="sign-card-container">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.email && errors.email ? (
              <p className="error-p">{errors.email}</p>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="Name"
              label="Name"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.name && errors.name ? (
              <p className="error-p">{errors.name}</p>
            ) : (
              ""
            )}
            
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="mobile"
              label="Mobile"
              name="mobile"
              value={values.mobile}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.mobile && errors.mobile ? (
              <p className="error-p">{errors.mobile}</p>
            ) : (
              ""
            )}
             <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="land"
              label="land size in cents"
              name="land"
              value={values.land}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.land && errors.land ? (
              <p className="error-p">{errors.land}</p>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.password && errors.password ? (
              <p className="error-p">{errors.password}</p>
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              
              <Grid item>
                <Link to="/login" variant="body2">
                  {"All Ready you have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
