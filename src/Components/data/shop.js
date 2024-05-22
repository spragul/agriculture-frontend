import axios from "axios";
import { backendurl } from "../../Backendlink";
import { fetchshopData } from "../../Redux/shopSlice";
import { fetchfpData } from "../../Redux/fpSlice";


//getdata vegetable details
export const getAllShop = async (dispatch,token) => {
    try {
      const response = await axios.get(`${backendurl}/shop`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      if(response.data.rd==true){
         dispatch(fetchshopData(response.data.shop))
       return {responses:true,response}
      }
    } catch (error) {
      console.log(error);
     return {responses:false,error}
    }
  };
  
  //get fertilizer
  export const getAllfertilizer=async(dispatch,token,id)=>{
    try {
      const response = await axios.get(`${backendurl}/fp/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd == true) {
        dispatch(fetchfpData(response.data.fertilizer));
        return {responses:true,response}
      } 
    } catch (error) {
      console.log(error);
      return {responses:false,error}
    }
  }