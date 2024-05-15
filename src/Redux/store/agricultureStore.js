import {configureStore} from '@reduxjs/toolkit';
import vegetableSlice from '../vegetableSlice';




export const store =configureStore({
    reducer:{
        vegetableapireducer:vegetableSlice,
        
    }
})