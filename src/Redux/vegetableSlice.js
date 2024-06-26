import {createSlice} from '@reduxjs/toolkit'

const vegetableSlice =createSlice({
    name:"vegetable",
    initialState:{value:[],isLoading:false},
    reducers:{
      Loaging:(state,action)=>{
      state.isLoading=true;
      },
      fetchData:(state,action)=>{
       state.isLoading=true;
       state.value=action.payload;
      },
      displayData:(state,action)=>{
        console.log(action.payload)
        state.isLoading=true;
        state.value=state.value.filter((item)=>{return action.payload === ""
        ? item
        : item.title.toLowerCase().includes(action.payload.toLowerCase());});
      },
      addvege:(state,action)=>{
        state.isLoading=true;
       state.value=[...state.value,action.payload]
      },
      editveg:(state,action)=>{
        state.isLoading=true;
        let id=action.payload._id;
        let removeproduct=state.value.filter((val)=>val._id !==id);
        state.value=[...removeproduct,action.payload];
      },
      deleteveg:(state,action)=>{
        state.isLoading=true;
        let id=action.payload;
        let newlist=state.value.filter((val)=>val._id!==id);
        state.value=newlist;
      },
      resetvegdata:(state,action)=>{
        state.isLoading=false;
        state.cart=action.payload
      }
    }
})

export const {Loaging,fetchData,addvege,editveg,deleteveg,displayData,resetvegdata}=vegetableSlice.actions;
export default vegetableSlice.reducer;