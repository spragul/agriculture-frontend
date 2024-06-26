import {configureStore} from '@reduxjs/toolkit';
import vegetableSlice from '../vegetableSlice';
import shopSlice from '../shopSlice';
import fertilizerSlice from "../fpSlice"
import soilSclice from '../soilSclice';
import governmentSlice from '../governmentSlice';




export const store =configureStore({
    reducer:{
        vegetableapireducer:vegetableSlice,
        shopapireducer:shopSlice,
        fertilizerapireducer:fertilizerSlice,
        soilapireducer:soilSclice,
        governmentapireducer:governmentSlice
        
    }
})