import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authAPi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// register
		register: builder.mutation({
			query: (data) => ({
				url: "/register",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					localStorage.setItem(
						"userData",
						JSON.stringify({
							isLoggedIn: true,
							user: result.data.user,
							role: result.data.user.role,
						})
					);
					dispatch(
						userLoggedIn({
							isLoggedIn: true,
							user: result.data.user,
							role: result.data.user.role,
						})
					);
				} catch (error) {
					//do nothing
				}
			},
		}),

		// log in
		login: builder.mutation({
			query: ({ data, role }) => ({
				url: "/login",
				method: "POST",
				body: data,
			}),
			transformResponse: (response, meta, arg) => {
				if (arg.role !== response.user.role) {
					throw new Error(
						`You entered wrong email for ${arg.role} role`
					);
				}
				return response;
			},
			async onQueryStarted(
				{ data, role },
				{ queryFulfilled, dispatch }
			) {
				try {
					const result = await queryFulfilled;
					if (role == result.data.user.role) {
						localStorage.setItem(
							"userData",
							JSON.stringify({
								isLoggedIn: true,
								user: result.data.user,
								role: result.data.user
									.role,
							})
						);
						dispatch(
							userLoggedIn({
								isLoggedIn: true,
								user: result.data.user,
								role: result.data.user
									.role,
							})
						);
					}
				} catch (error) {
					return error;
				}
			},
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation } = authAPi;
