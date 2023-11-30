import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name : 'tokens',
    initialState : {
        value : null,
    },
    reducers : {
        addTokens : (state , action) => {
            state.value = action.payload
        },
        removeTokens : (state) => {
            state.value = null
        },
    }
})

export const { addTokens , removeTokens } = tokenSlice.actions

export default tokenSlice.reducer


