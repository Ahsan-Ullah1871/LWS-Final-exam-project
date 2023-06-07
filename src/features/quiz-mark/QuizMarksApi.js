import { apiSlice } from "../api/apiSlice";

export const quizMarksApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//Get All quizsMarks
		getQuizMarks: builder.query({
			query: () => `/quizMark`,
		}),

		// Add quiz
		addQuizMark: builder.mutation({
			query: (data) => ({
				url: `/quizMark`,
				method: "POST",
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data: new_quiz_mark } =
						await queryFulfilled;
					if (new_quiz_mark?.id) {
						//Cash updating in  Pessimistic  way
						dispatch(
							apiSlice.util.updateQueryData(
								"getQuizMarks",
								undefined,
								(draft) => {
									draft.push(
										new_quiz_mark
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
	}),
});

export const { useGetQuizMarksQuery, useAddQuizMarkMutation } = quizMarksApi;
