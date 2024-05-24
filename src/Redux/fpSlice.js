import { createSlice } from "@reduxjs/toolkit";

const fertilizerSlice = createSlice({
  name: "fertilizer",
  initialState: { value: [], isLoading: false },
  reducers: {
    Loaging: (state, action) => {
      state.isLoading = true;
    },
    fetchfpData: (state, action) => {
      state.isLoading = true;
      state.value = action.payload;
    },
    addfp: (state, action) => {
      state.isLoading = true;
      state.value = [...state.value, action.payload];
    },
    editfp: (state, action) => {
      state.isLoading = true;
      let id = action.payload._id;
      let removeproduct = state.value.filter((val) => val._id !== id);
      state.value = [...removeproduct, action.payload];
    },
    deletefp: (state, action) => {
      state.isLoading = true;
      let id = action.payload;
      let newlist = state.value.filter((val) => val._id !== id);
      state.value = newlist;
    },
    resetspdata:(state,action)=>{
      state.isLoading=false;
      state.cart=action.payload
    }
  },
});

export const { Loaging, addfp, editfp, fetchfpData, deletefp,resetspdata } = fertilizerSlice.actions;
export default fertilizerSlice.reducer;
