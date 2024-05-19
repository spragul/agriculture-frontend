import {configureStore} from '@reduxjs/toolkit';
import vegetableSlice from '../vegetableSlice';
import shopSlice from '../shopSlice';




export const store =configureStore({
    reducer:{
        vegetableapireducer:vegetableSlice,
        shopapireducer:shopSlice
        
    }
})