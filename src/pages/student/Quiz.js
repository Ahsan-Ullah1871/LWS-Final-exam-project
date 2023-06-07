import React, { useEffect, useState } from "react";
import SelectedVideoQuiz from "../../components/Quiz Submit/SelectedVideoQuiz";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetQuizzesQuery } from "../../features/quiz/QuizApi";
import { useGetQuizMarksQuery } from "../../features/quiz-mark/QuizMarksApi";
import UILoading from "../../utils/Loading/UILoading";
import ErrorUI from "../../utils/Error/ErrorUi";

const Quiz = () => {
	// Selected Video Selector
	const { videoID } = useParams();

	// User Details
	const { user } = useSelector((state) => state.auth);

	// Skip state
	const [skipFetch, setSkipFetch] = useState(true);

	//get quizzes
	const {
		data: quizzes,
		isLoading,
		isFetching,
		isError,
		error,
		isSuccess,
	} = useGetQuizzesQuery(
		{
			video_id: videoID,
		},
		{ skip: skipFetch }
	);

	//get quiz mark base on student id and video id
	const { data: quizMarks } = useGetQuizMarksQuery();

	const IsCurrentStudentQuizSubmitted =
		quizMarks?.filter(
			(quiz_mark) =>
				quiz_mark?.video_id == videoID &&
				quiz_mark?.student_id == user.id
		)?.length > 0
			? true
			: false;

	//Fetch quiz base on video id
	useEffect(() => {
		if (videoID) {
			setSkipFetch(false);
		}
	}, [videoID]);

	// UI Decission
	let content = null;
	if (isFetching && isLoading)
		content = <UILoading message={"Quizzes Loading"} />;
	else if (!isLoading && isError)
		content = <ErrorUI message={error?.message} />;
	else if (
		!isLoading &&
		!isError &&
		(quizzes == undefined || quizzes == null)
	)
		content = <UILoading message={"Quizzes Loading"} />;
	else if (!isFetching && !isLoading && !isError && quizzes?.length == 0) {
		content = <UILoading message={"Quiz not found for this video"} />;
	} else if (
		!isFetching &&
		!isLoading &&
		!isError &&
		quizzes?.length > 0 &&
		IsCurrentStudentQuizSubmitted
	) {
		content = (
			<UILoading message={"Already you submitted quiz answer"} />
		);
	} else if (!isLoading && !isError && quizzes?.length > 0) {
		content = (
			<div>
				<SelectedVideoQuiz
					quizzes={quizzes}
					videoID={videoID}
				/>
			</div>
		);
	}

	return <div className="mt-10">{content}</div>;
};

export default Quiz;
