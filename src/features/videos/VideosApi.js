import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//Get All videos
		getVideos: builder.query({
			query: () => "/videos",
		}),

		// Add video
		addVideo: builder.mutation({
			query: (data) => ({
				url: `/videos`,
				method: "POST",
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data: new_video } =
						await queryFulfilled;
					if (new_video?.id) {
						//Cash updating in  Pessimistic  way
						dispatch(
							apiSlice.util.updateQueryData(
								"getVideos",
								undefined,
								(draft) => {
									draft.push(
										new_video
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

		// edit video
		editVideo: builder.mutation({
			query: ({ data, video_id }) => ({
				url: `/videos/${video_id}`,
				method: "PATCH",
				body: data,
			}),

			async onQueryStarted(
				{ data, video_id },
				{ queryFulfilled, dispatch }
			) {
				//Cash updating in  Optimistic  way
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getVideos",
						undefined,
						(draft) => {
							return draft.map((item) => {
								if (
									item.id !=
									video_id
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

		// Delete video
		deleteVideo: builder.mutation({
			query: ({ video_id }) => ({
				url: `/videos/${video_id}`,
				method: "DELETE",
			}),

			async onQueryStarted(
				{ video_id },
				{ queryFulfilled, dispatch }
			) {
				//Cash updating in  Optimistic  way
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getVideos",
						undefined,
						(draft) => {
							return draft.filter(
								(item) =>
									item.id !=
									video_id
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
	useGetVideosQuery,
	useAddVideoMutation,
	useEditVideoMutation,
	useDeleteVideoMutation,
} = videosApi;
