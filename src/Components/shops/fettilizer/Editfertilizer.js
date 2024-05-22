import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Sidebar from "../../sidebar/sidebar";
import EditfertilizerForm from "./EditfertilizerForm";
import { Loading } from "../../../Pages/Loading";
import { getAllfertilizer } from "../../data/shop";

function EditFertilizerShop() {
  const [editdata, setEditdata] = useState({});
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  let datas = useSelector((state) => state.fertilizerapireducer.value);
  console.log(datas);

  //get Data
  async function getdata() {
    let shopData = await getAllfertilizer(dispatch, token,id);
    if (shopData.responses == true) {
      toast.success(shopData.response.data.message);
      let seleteddata = datas.filter((val) => val._id == id);
      setEditdata(seleteddata[0]);
    } else {
      console.log(shopData.error.response.data.message);
      toast.error(shopData.error.response.data.message);
    }
  }

  //getdata
  useEffect(() => {
    if (datas.length == 0) {
      getdata();
    } else {
      let seleteddata = datas.filter((val) => val._id == id);
      setEditdata(seleteddata[0]);
    }
  }, []);
  return (
    <Sidebar>
      {editdata._id ? <EditfertilizerForm datas={editdata} /> : <Loading />}
    </Sidebar>
  );
}

export default EditFertilizerShop;
