import {configureStore} from '@reduxjs/toolkit';
import vegetableSlice from '../vegetableSlice';
import shopSlice from '../shopSlice';
import fertilizerSlice from "../fpSlice"




export const store =configureStore({
    reducer:{
        vegetableapireducer:vegetableSlice,
        shopapireducer:shopSlice,
        fertilizerapireducer:fertilizerSlice
        
    }
})