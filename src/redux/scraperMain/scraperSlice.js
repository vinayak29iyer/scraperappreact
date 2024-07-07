import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        metaDescription: '',
        metaKeywords: '',
        pageTitle: '',
        productImage: '',
        productTitle: '',
        cache: false,
        responseTime: ''
    }
};
export const scraperSlice = createSlice({
    name: 'scraperApiData',
    initialState,
    reducers: {
        //functions
        // increment: state => {
        //     state.value += 1;
        // },
        // decrement: state => {
        //     state.value -= 1;
        // },
        setValue: (state, action) => {
            //state -> this is value of previous state which needs to be changed with new, the above const initialState has a data attribute which needs to be updated
            // console.log('action>> ',action.payload)
            // console.log('prevState,>> ',JSON.stringify(state))
            state.data = {
                ...state.data,
                ...action.payload.data
            }
        }
    },
});

export const { /* increment, decrement,setSaveObjValue, */ setValue  } = scraperSlice.actions;
export default scraperSlice.reducer;
