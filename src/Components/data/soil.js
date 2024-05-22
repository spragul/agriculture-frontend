import axios from "axios";
import { backendurl } from "../../Backendlink";
import { fetchsoilData } from "../../Redux/soilSclice";

export const getAllreport = async (dispatch, token, id) => {
  try {
    const response = await axios.get(`${backendurl}/soilreport/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    if (response.data.rd == true) {
      dispatch(fetchsoilData(response.data.soil));
      return { responses: true, response };
    }
  } catch (error) {
    console.log(error);
    return { responses: false, error };
  }
};
