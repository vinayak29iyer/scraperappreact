import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterManagement/counterSlice';
import changeMsgReducer from './About/changeMsgSlice';
import scraperApiDataReducer from './scraperMain/scraperSlice'

export const store = configureStore({
    //all reducer Main Slices/Modules here 
    reducer: {
        counter: counterReducer,
        changeMsg: changeMsgReducer,
        scraperApiData: scraperApiDataReducer
    },
});
