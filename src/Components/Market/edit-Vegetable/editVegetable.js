import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editform from "./Editform";
import Sidebar from "../../sidebar/sidebar";
import { useParams } from "react-router-dom";
import { getvegetale } from "../../data/vegetable";
import { toast } from "react-toastify";

//vegetable schema

function EditVegetable() {
  const dispatch=useDispatch();
  const [editdata, setEditdata] = useState({});
  const { id } = useParams();
  const data = useSelector((state) => state.vegetableapireducer.value);

  async function getdata() {
    let vegetabledata = await getvegetale(dispatch);
    if (vegetabledata.responses == true) {
      toast.success(vegetabledata.response.data.message);
    } else {
      console.log(vegetabledata.error.response.data.message);
      toast.error(vegetabledata.error.response.data.message);
    }
  }
  //getdata
  useEffect(() => {
    if (data.length == 0) {
      getdata();
    } else {
      let seleteddata = data.filter((val) => val._id == id);
      setEditdata(seleteddata[0]);
    }
  }, []);

  return (
    <Sidebar>
        {editdata._id ? <Editform datas={editdata} /> : <div>Loading</div>}
    </Sidebar>
  );
}

export default EditVegetable;
