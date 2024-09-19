import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    data: ''
};
export const userManagementSlice = createSlice({
    name: 'userApiData',
    initialState,
    reducers: {
        setUserDataValue: (state, action) => {
            //state -> this is value of previous state which needs to be changed with new, the above const initialState has a data attribute which needs to be updated
            console.log('action>> ',action.payload)
            console.log('prevState,>> ',JSON.stringify(state))
            state.data = {
                ...state.data,
                ...action.payload.data
            }
        }
    },
});

export const { /* increment, decrement,setSaveObjValue, */ setUserDataValue  } = userManagementSlice.actions;
export default userManagementSlice.reducer;
