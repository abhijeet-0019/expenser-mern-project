import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    getUser: (state, {payload}) => {
        // console.log("user from payload - ", payload.user);
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    userLogout: (state)=>{
        state.user = {};
        state.isAuthenticated = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUser, userLogout } = authSlice.actions

export default authSlice.reducer