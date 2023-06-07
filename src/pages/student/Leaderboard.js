import React, { useEffect, useState } from "react";
import CurrentUserPosition from "../../components/Leaderboard/CurrentUserPosition";
import TopList from "../../components/Leaderboard/TopList";
import { useGetAssignmentsMarksQuery } from "../../features/assignments-marks/AssignmentsMarksApi";
import { useGetQuizMarksQuery } from "../../features/quiz-mark/QuizMarksApi";
import { leaderBoardRank } from "../../components/Leaderboard/LeaderBoardFunctions";
import UILoading from "../../utils/Loading/UILoading";
import ErrorUI from "../../utils/Error/ErrorUi";

const Leaderboard = () => {
	//get assignment mark base on student id and assignment id
	const {
		data: assignmentMarks,
		isLoading: assignmentMarksLoading,
		isError: assignmentMarksIsError,
		error: assignmentMarksError,
		isFetching: assignmentMarksIsFetching,
	} = useGetAssignmentsMarksQuery();
	//get quiz mark base on student id and video id
	const {
		data: quizMarks,
		isLoading: quizMarksIsLoading,
		isError: quizMarksIsError,
		error: quizMarksError,
		isFetching: quizMarksIsFetching,
	} = useGetQuizMarksQuery();

	// RankList
	const [rankList, setRankList] = useState([]);
	useEffect(() => {
		if (
			!assignmentMarksLoading &&
			!assignmentMarksIsFetching &&
			!quizMarksIsLoading &&
			!quizMarksIsFetching &&
			(quizMarks?.length > 0 || assignmentMarks?.length > 0)
		) {
			setRankList(
				leaderBoardRank({
					assignmentMarks,
					quizMarks,
				})
			);
		}
	}, [assignmentMarks, quizMarks]);

	//Decide UI
	let content = null;
	if (
		assignmentMarksLoading &&
		assignmentMarksIsFetching &&
		quizMarksIsLoading &&
		quizMarksIsFetching
	)
		content = <UILoading message={"Leaderboard Loading"} />;
	else if (
		((!assignmentMarksLoading && !assignmentMarksIsFetching) ||
			(!quizMarksIsLoading && !quizMarksIsFetching)) &&
		(assignmentMarksIsError || quizMarksIsError)
	)
		content = (
			<ErrorUI
				message={
					quizMarksError?.message ||
					assignmentMarksError?.message
				}
			/>
		);
	else if (
		!assignmentMarksIsError &&
		quizMarksIsError &&
		(quizMarks == undefined ||
			quizMarks == null ||
			assignmentMarks == undefined ||
			assignmentMarks == null)
	) {
		content = <UILoading message={"Leaderboard Loading"} />;
	} else if (
		!assignmentMarksLoading &&
		!assignmentMarksIsFetching &&
		!quizMarksIsLoading &&
		!quizMarksIsFetching &&
		quizMarks?.length == 0 &&
		assignmentMarks?.length == 0
	) {
		content = (
			<UILoading
				message={"Leaderboard not available for now "}
			/>
		);
	} else if (
		!assignmentMarksLoading &&
		!assignmentMarksIsFetching &&
		!quizMarksIsLoading &&
		!quizMarksIsFetching &&
		(quizMarks?.length > 0 || assignmentMarks?.length > 0) &&
		rankList?.length > 0
	) {
		content = (
			<>
				<CurrentUserPosition RankList={rankList} />
				<TopList RankList={rankList} />
			</>
		);
	}

	return (
		<section className="py-6 bg-primary">
			<div className="mx-auto max-w-7xl px-5 lg:px-0">
				{content}
			</div>
		</section>
	);
};

export default Leaderboard;
