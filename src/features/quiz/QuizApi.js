import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//Get All quizzes
		getQuizzes: builder.query({
			query: (args) => {
				let query = args?.video_id
					? `?video_id=${args?.video_id}`
					: "";
				return `/quizzes${query}`;
			},
		}),

		// Add quiz
		addQuizzes: builder.mutation({
			query: (data) => ({
				url: `/quizzes`,
				method: "POST",
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data: new_quiz } =
						await queryFulfilled;
					if (new_quiz?.id) {
						//Cash updating in  Pessimistic  way
						dispatch(
							apiSlice.util.updateQueryData(
								"getQuizzes",
								undefined,
								(draft) => {
									draft.push(
										new_quiz
									);
								}
							)
						);
					}
				} catch (error) {
					//
				}
			},
		}),

		// edit quiz
		editQuiz: builder.mutation({
			query: ({ data, quiz_id }) => ({
				url: `/quizzes/${quiz_id}`,
				method: "PATCH",
				body: data,
			}),

			async onQueryStarted(
				{ data, quiz_id },
				{ queryFulfilled, dispatch }
			) {
				//Cash updating in  Optimistic  way
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getQuizzes",
						undefined,
						(draft) => {
							return draft.map((item) => {
								if (
									item.id !=
									quiz_id
								) {
									return item;
								} else {
									return {
										...item,
										...data,
									};
								}
							});
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();
				}
			},
		}),

		// Delete quiz
		deleteQuiz: builder.mutation({
			query: ({ quiz_id }) => ({
				url: `/quizzes/${quiz_id}`,
				method: "DELETE",
			}),

			async onQueryStarted(
				{ quiz_id },
				{ queryFulfilled, dispatch }
			) {
				//Cash updating in  Optimistic  way
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getQuizzes",
						undefined,
						(draft) => {
							return draft.filter(
								(item) =>
									item.id !=
									quiz_id
							);
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();
				}
			},
		}),
	}),
});

export const {
	useGetQuizzesQuery,
	useAddQuizzesMutation,
	useEditQuizMutation,
	useDeleteQuizMutation,
} = quizApi;
