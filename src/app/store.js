import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import courseReducer from "../features/CoursePlayer/CourseVideosSlice";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		course: courseReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
});

