import { createSlice } from "@reduxjs/toolkit";

const governmentSlice = createSlice({
  name: "government",
  initialState: { value: [],reviews:[], isLoading: false },
  reducers: {
    Loaging: (state, action) => {
      state.isLoading = true;
    },
    fetchgsData: (state, action) => {
      state.isLoading = true;
      state.value = action.payload
    },
    addgs: (state, action) => {
      state.isLoading = true;
      state.value = [...state.value, action.payload];
    },
    editgs: (state, action) => {
      state.isLoading = true;
      let id = action.payload._id;
      let removeproduct = state.value.filter((val) => val._id !== id);
      state.value = [...removeproduct, action.payload];
    },
    deletegs: (state, action) => {
      state.isLoading = true;
      let id = action.payload;
      let newlist = state.value.filter((val) => val._id !== id);
      state.value = newlist;
    },
    resetgsdata:(state,action)=>{
      state.isLoading=false;
      state.cart=action.payload
    },
    fetchgsrvData: (state, action) => {
      state.isLoading = true;
      state.reviews = action.payload
    },
    addgsrv: (state, action) => {
      state.isLoading = true;
      state.reviews=[...state.reviews,action.payload]
    },
    deletegsrv: (state, action) => {
      state.isLoading = true;
      let id = action.payload;
      console.log(id)
      let newlist = state.reviews.filter((val) => val._id !== id);
      state.reviews = newlist;
    },


  }
});

export const { Loaging, addgs,editgs,deletegs,fetchgsData,addgsrv,resetgsdata,deletegsrv,fetchgsrvData } = governmentSlice.actions;
export default governmentSlice.reducer;
