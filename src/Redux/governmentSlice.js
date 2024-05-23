import { createSlice } from "@reduxjs/toolkit";

const governmentSlice = createSlice({
  name: "government",
  initialState: { value: [], isLoading: false },
  reducers: {
    Loaging: (state, action) => {
      state.isLoading = true;
    },
    fetchgsData: (state, action) => {
      state.isLoading = true;
      state.value = action.payload;
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
    addgsrv:(state,action)=>{
      state.isLoading = true;
      let id = action.payload._id;
      let newlist = state.value.filter((val) => val._id == id);
      let add=newlist.userreview.push(action.payload);
      let removeproduct = state.value.filter((val) => val._id !== id);
      state.value = [...removeproduct, add];
    }
  }
});

export const { Loaging, addgs,editgs,deletegs,fetchgsData } = governmentSlice.actions;
export default governmentSlice.reducer;