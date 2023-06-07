import { apiSlice } from "../api/apiSlice";
import { selectVideo } from "./CourseVideosSlice";

export const coursePlayerApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//Get All videos
		getCourseVideos: builder.query({
			query: () => "/videos",
			providesTags: ["courseVideos"],

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					const isSelectedVideoAvailable =
						localStorage.getItem(
							"selectedVideoID"
						);

					if (isSelectedVideoAvailable) {
						let find_selected_video =
							result.data.filter(
								(video) =>
									video.id ==
									localStorage.getItem(
										"selectedVideoID"
									)
							);
						dispatch(
							selectVideo(
								find_selected_video[0]
							)
						);
					} else {
						dispatch(selectVideo(result.data[0]));
					}
				} catch (error) {
					//do nothing
				}
			},
		}),

		//Get  course  video details
		getCourseVideoDetails: builder.query({
			query: ({ videoID }) => {
				return `/videos/${videoID}`;
			},
		}),
	}),
});

export const { useGetCourseVideosQuery, useGetCourseVideoDetailsQuery } =
	coursePlayerApi;
