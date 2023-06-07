import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	user: undefined,
	role: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn;
			state.user = action.payload.user;
			state.role = action.payload.user.role;
		},
		userLoggedOut: (state, action) => {
			state.isLoggedIn = false;
			state.user = undefined;
			state.role = undefined;
		},
	},
});

export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
