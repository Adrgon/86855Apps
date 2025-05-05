import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth", 
    initialState: {
        value: {
            user: null,
            token: null,
        }
    },
    reducers: {
        setUser: (state, {payload})=> {
            state.value.user = payload.email
            state.value.token = payload.idToken
        }
    }
})

export const {setUser} = authSlice.actions
export default authSlice.reducer
