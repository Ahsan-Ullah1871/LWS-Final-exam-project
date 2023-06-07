import { apiSlice } from "../api/apiSlice";

export const assignmentsMarksApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//Get All assignmentsMarks
		getAssignmentsMarks: builder.query({
			query: () => "/assignmentMark",
		}),

		// Add assignment
		addAssignmentMark: builder.mutation({
			query: (data) => ({
				url: `/assignmentMark`,
				method: "POST",
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data: new_assignment } =
						await queryFulfilled;
					if (new_assignment?.id) {
						//Cash updating in  Pessimistic  way
						dispatch(
							apiSlice.util.updateQueryData(
								"getAssignmentsMarks",
								undefined,
								(draft) => {
									draft.push(
										new_assignment
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

		// edit assignment
		editAssignmentMark: builder.mutation({
			query: ({ data, assignment_mark_id }) => ({
				url: `/assignmentMark/${assignment_mark_id}`,
				method: "PATCH",
				body: data,
			}),

			async onQueryStarted(
				{ data, assignment_mark_id },
				{ queryFulfilled, dispatch }
			) {
				//Cash updating in  Optimistic  way
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getAssignmentsMarks",
						undefined,
						(draft) => {
							return draft.map((item) => {
								if (
									item.id !=
									assignment_mark_id
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
	}),
});

export const {
	useGetAssignmentsMarksQuery,
	useAddAssignmentMarkMutation,
	useEditAssignmentMarkMutation,
} = assignmentsMarksApi;
