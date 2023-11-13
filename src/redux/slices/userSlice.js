import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name : 'user',
    initialState : {
        value : null,
    },
    reducers : {
        addUserDetails : (state , action) => {
            state.value = action.payload
        },
        removeUserDetails : (state) => {
            state.value = null
        }
    }
})

export const { addUserDetails , removeUserDetails } = userSlice.actions

export default userSlice.reducer


