import axios from "axios";
import { fetchgsData } from "../../Redux/governmentSlice";
import { backendurl } from "../../Backendlink";

export const getgovernmentdata = async (dispatch,token) => {
  try {
    const response = await axios.get(`${backendurl}/government`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    console.log(response);
    if (response.data.rd === true) {
      dispatch(fetchgsData(response.data.government));
      return { responses: true, response };
    }
  } catch (error) {
    return { responses: false, error };
  }
};
