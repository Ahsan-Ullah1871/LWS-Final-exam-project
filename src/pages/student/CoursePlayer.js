import React from "react";
import CourseVideosList from "../../components/CoursePlayer/CourseVideosList";
import VideoDetails from "../../components/CoursePlayer/VideoDetails";
import UILoading from "../../utils/Loading/UILoading";
import ErrorUI from "../../utils/Error/ErrorUi";
import { useGetCourseVideosQuery } from "../../features/CoursePlayer/CourseVideosApi";

const CoursePlayer = () => {
	// Get videos query
	const {
		data: videos,
		isLoading,
		isFetching,
		isError,
		error,
		isSuccess,
	} = useGetCourseVideosQuery();

	//

	//Decide UI
	let content = null;
	if (isFetching && isLoading)
		content = <UILoading message={"Videos Loading"} />;
	else if (!isLoading && isError)
		content = <ErrorUI message={error?.message} />;
	else if (
		!isLoading &&
		!isError &&
		(videos == undefined || videos == null)
	)
		content = <UILoading message={"Videos Loading"} />;
	else if (!isFetching && !isLoading && !isError && videos?.length == 0) {
		content = <UILoading message={"Video not found"} />;
	} else if (!isLoading && !isError && videos?.length > 0) {
		content = (
			<div className="mx-auto max-w-7xl px-5 lg:px-0">
				<div className="grid grid-cols-3 gap-2 lg:gap-8">
					<VideoDetails />
					<CourseVideosList videos={videos} />
				</div>
			</div>
		);
	}

	return <section className="py-6 bg-primary">{content}</section>;
};

export default CoursePlayer;
