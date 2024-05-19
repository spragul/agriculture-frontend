import {createSlice} from '@reduxjs/toolkit'

const shopSlice =createSlice({
    name:"vegetable",
    initialState:{value:[],isLoading:false},
    reducers:{
      Loaging:(state,action)=>{
      state.isLoading=true;
      },
      fetchshopData:(state,action)=>{
       state.isLoading=true;
       state.value=action.payload;
      },
      addsd:(state,action)=>{
        state.isLoading=true;
       state.value=[...state.value,action.payload]
      },
      editsd:(state,action)=>{
        state.isLoading=true;
        let id=action.payload._id;
        let removeproduct=state.value.filter((val)=>val._id !==id);
        state.value=[...removeproduct,action.payload];
      },
      deletesd:(state,action)=>{
        state.isLoading=true;
        let id=action.payload;
        let newlist=state.value.filter((val)=>val._id!==id);
        state.value=newlist;
      }
    }
})

export const {Loaging,fetchshopData,addsd,editsd,deletesd}=shopSlice.actions;
export default shopSlice.reducer;