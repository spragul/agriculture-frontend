import axios from "axios";
import {addvege, fetchData,deleteveg, editveg } from "../../Redux/vegetableSlice";
import { backendurl } from "../../Backendlink";

const token = sessionStorage.getItem("token");

//getdata vegetable details
export const getvegetale = async (dispatch,token) => {
  try {
    const response = await axios.get(`${backendurl}/vegetable`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response)
    if(response.data.rd==true){
       dispatch(fetchData(response.data.vegetable))
     return {responses:true,response}
    }
  } catch (error) {
    console.log(error);
   return {responses:false,error}
  }
};

//add vegetable data
export const addveg=async({ vegetable },dispatch)=> {
    console.log(vegetable)
    try {
      const response = await axios.post(`${backendurl}/vegetable/add`, vegetable, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd === true) {
        dispatch(addvege(response.data.newvegetable))
        return {responses:true,response}
      }
    } catch (error) {
      console.log(error);
      return {responses:false,error}
    }
  }

  //delete vegetable data
export const deleteVegetableData=async(id,dispatch)=> {
  console.log(id)
  try {
    const response = await axios.delete(`${backendurl}/vegetable/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    if (response.data.rd === true) {
      dispatch(deleteveg(id))
      return {responses:true,response}
    }
  } catch (error) {
    console.log(error);
    return {responses:false,error}
  }
}
//Edit vegetable Data
export const editVegetableData=async({vegetable},dispatch)=> {
  try {
    const response = await axios.put(`${backendurl}/vegetable/edit`,vegetable, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    if (response.data.rd === true) {
      dispatch(editveg(response.data.veg))
      return {responses:true,response}
    }
  } catch (error) {
    console.log(error);
    return {responses:false,error}
  }
}