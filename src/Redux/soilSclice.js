import { createSlice } from "@reduxjs/toolkit";

const soilSlice = createSlice({
  name: "soil",
  initialState: { value: [], isLoading: false },
  reducers: {
    Loaging: (state, action) => {
      state.isLoading = true;
    },
    fetchsoilData: (state, action) => {
      state.isLoading = true;
      state.value = action.payload;
    },
    addsoil: (state, action) => {
      state.isLoading = true;
      state.value = [...state.value, action.payload];
    },
    editsoil: (state, action) => {
      state.isLoading = true;
      let id = action.payload._id;
      let removeproduct = state.value.filter((val) => val._id !== id);
      state.value = [...removeproduct, action.payload];
    },
    deletesoil: (state, action) => {
      state.isLoading = true;
      let id = action.payload;
      let newlist = state.value.filter((val) => val._id !== id);
      state.value = newlist;
    },
    resetsoildata:(state,action)=>{
      state.isLoading=false;
      state.cart=action.payload
    }
  },
});

export const { Loaging, fetchsoilData, addsoil, editsoil, deletesoil,resetsoildata } = soilSlice.actions;
export default soilSlice.reducer;
