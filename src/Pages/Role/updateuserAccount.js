import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendurl } from "../../Backendlink";
import { toast } from "react-toastify";
import Sidebar from "../../Components/sidebar/sidebar";
import UpdateUser from "./roleUser";

function UpdateuserAccount() {
  const [oneuser, setOneuser] = useState({});
  const userId = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");
  //get user deatils
  const getoneuser = async (ids) => {
    try {
      let response = await axios.get(`${backendurl}/user/${ids}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        setOneuser(response.data.user);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getoneuser(userId);
  }, []);
  return (
    <Sidebar>{oneuser._id ? <UpdateUser oneuser={oneuser} /> : ""}</Sidebar>
  );
}

export default UpdateuserAccount;
