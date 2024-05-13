import * as React from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";
import { backendurl } from "../../Backendlink";
import "./resetpassword.css";
import { Button, IconButton } from "@mui/material";

const userSchema = yup.object({
  password1: yup
    .string()
    .min(3, "Enter minmum 3 characters")
    .required("Enter your password"),
  password2: yup
    .string()
    .min(3, "Enter minmum 3 characters")
    .required("Enter your password"),
});

// TODO remove, this demo shouldn't need to reset the theme.

export default function Reset() {
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const { id, token } = useParams();
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show1) => !show1);

  const navigate = useNavigate();
  //userdata send backend
  async function datasend({userdata}) {
    console.log(userdata.password1);
    let password={password:userdata.password1};
    console.log(password)
    try {
      let response = await axios.put(`${backendurl}/user/reset/${id}/${token}`, password,{ headers: {"Authorization" : `Bearer ${token}`}});
      console.log(response)
      if (response.data.rd == true) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  //formik controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password1: "",
        password2: "",
      },
      validationSchema: userSchema,
      onSubmit: (userdata) => {
        console.log(userdata);
        if (userdata.password1 == userdata.password2) {
          datasend({userdata});
        } else {
          toast.error("Password not match");
        }
      },
    });
  return (
    <div className="reset-container">
      <Container
        component="main"
        maxWidth="xs"
        className="reset-card-container"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              name="password1"
              value={values.password1}
              onBlur={handleBlur}
              onChange={handleChange}
              type={showPassword1 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                  >
                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.password1 && touched.password1 ? (
            <p className="error-p">{errors.password1}</p>
          ) : (
            ""
          )}
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              name="password2"
              value={values.password2}
              onBlur={handleBlur}
              onChange={handleChange}
              type={showPassword2 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.password2 && touched.password2 ? (
            <p className="error-p">{errors.password2}</p>
          ) : (
            ""
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            submit
          </Button>
        </Box>
      </Container>
    </div>
  );
}
