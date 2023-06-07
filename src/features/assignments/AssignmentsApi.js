import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//Get All assignments
		getAssignments: builder.query({
			query: (args) => {
				let query = args?.video_id
					? `?video_id=${args?.video_id}`
					: "";
				return `/assignments${query}`;
			},
		}),

		// Add assignment
		addAssignments: builder.mutation({
			query: (data) => ({
				url: `/assignments`,
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
								"getAssignments",
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
		editAssignment: builder.mutation({
			query: ({ data, assignment_id }) => ({
				url: `/assignments/${assignment_id}`,
				method: "PATCH",
				body: data,
			}),

			async onQueryStarted(
				{ data, assignment_id },
				{ queryFulfilled, dispatch }
			) {
				//Cash updating in  Optimistic  way
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getAssignments",
						undefined,
						(draft) => {
							return draft.map((item) => {
								if (
									item.id !=
									assignment_id
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

		// Delete assignment
		deleteAssignment: builder.mutation({
			query: ({ assignment_id }) => ({
				url: `/assignments/${assignment_id}`,
				method: "DELETE",
			}),

			async onQueryStarted(
				{ assignment_id },
				{ queryFulfilled, dispatch }
			) {
				//Cash updating in  Optimistic  way
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getAssignments",
						undefined,
						(draft) => {
							return draft.filter(
								(item) =>
									item.id !=
									assignment_id
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
	useGetAssignmentsQuery,
	useAddAssignmentsMutation,
	useEditAssignmentMutation,
	useDeleteAssignmentMutation,
} = assignmentsApi;
