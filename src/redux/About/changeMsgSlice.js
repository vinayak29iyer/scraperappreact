import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        age: '', name: '', occpation: '', viewType: ''
    }
};
export const changeMsgSlice = createSlice({
    name: 'changeMsg',
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
            state.value = action.payload
        },
        setSaveObjValue: (state, action) => {
            console.log('action.payload> ',action.payload)
            state.user = action.payload
        },
    },
});

export const { increment, decrement, setValue, setSaveObjValue } = changeMsgSlice.actions;
export default changeMsgSlice.reducer;
