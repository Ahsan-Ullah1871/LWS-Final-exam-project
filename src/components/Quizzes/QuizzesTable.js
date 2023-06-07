import React, { useEffect, useState } from "react";
import {
	useDeleteQuizMutation,
	useGetQuizzesQuery,
} from "../../features/quiz/QuizApi";
import Alert from "../../utils/Alert/Alert";
import AlertBox from "../../utils/Alert/AlertBox";
import ErrorUI from "../../utils/Error/ErrorUi";
import UILoading from "../../utils/Loading/UILoading";
import QuizRow from "./QuizRow";

const QuizzesTable = () => {
	// Get quizzes query
	const {
		data: quizzes,
		isLoading,
		isFetching,
		isError,
		error,
		isSuccess,
	} = useGetQuizzesQuery();

	//Delete quiz mutation
	const [
		deleteQuiz,
		{
			isLoading: deleteLoading,
			isError: IsDeleteQuizError,
			isSuccess: deleteQuizzSuccess,
			error: deleteQuizError,
		},
	] = useDeleteQuizMutation();

	//Add quiz modal state
	const [modalOpen, setModalOpen] = useState(false);

	//handle delete quiz

	const handleDelete = (id) => {
		deleteQuiz({ quiz_id: id });
	};

	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);

	//Decide quiz UI
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
		content = <UILoading message={"Quiz not found"} />;
	} else if (!isLoading && !isError && quizzes?.length > 0) {
		content = (
			<table className="divide-y-1 text-base divide-gray-600 w-full">
				<thead>
					<tr>
						<th className="table-th">Question</th>
						<th className="table-th">Video</th>
						<th className="table-th justify-center">
							Action
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-600/50">
					{quizzes?.map((quiz) => {
						return (
							<QuizRow
								key={quiz.id}
								quiz={quiz}
								handleDelete={
									handleDelete
								}
								setAlertOpen={
									setAlertOpen
								}
								SetAlertType={
									SetAlertType
								}
								setMessage={setMessage}
							/>
						);
					})}
				</tbody>
			</table>
		);
	}

	//Delete quiz error and success handling
	useEffect(() => {
		if (IsDeleteQuizError) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage(deleteQuizError.data);
		} else if (deleteQuizzSuccess) {
			setAlertOpen(true);
			SetAlertType("success");
			setMessage("Quiz deleted successfully");
		}
	}, [IsDeleteQuizError, deleteQuizError?.data, deleteQuizzSuccess]);

	return (
		<>
			{content}
			{/*Alert UI */}
			<AlertBox
				id={`alert`}
				alertOpen={alertOpen}
				setAlertOpen={setAlertOpen}
				close_function={() => {
					SetAlertType("");
					setAlertOpen(false);
					setMessage("");
				}}
			>
				<Alert setAlertOpen={setAlertOpen} type={alertType}>
					{message}
				</Alert>
			</AlertBox>
		</>
	);
};

export default QuizzesTable;
