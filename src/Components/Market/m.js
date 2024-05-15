import React from "react";
import axios from "axios";
import { backendurl } from "../../Backendlink";
import Sidebar from "../sidebar/sidebar";

function Mtest() {
  const token=sessionStorage.getItem("token")
  function adddata() {
    const a = {
      name: "apple",
      categories: "fourt",
      image: "hrtiygnjvv",
      price: 5655,
    };
    const response = axios.post(`${backendurl}/vegetable/add`, a, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
  }
  return (
    <Sidebar>
      <div>
        <button onClick={() => adddata()} type="button">
          submit
        </button>
      </div>
    </Sidebar>
  );
}

export default Mtest;
