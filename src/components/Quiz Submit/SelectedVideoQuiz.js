import React, { useEffect, useState } from "react";
import {
	useGetCourseVideoDetailsQuery,
	useGetCourseVideosQuery,
} from "../../features/CoursePlayer/CourseVideosApi";
import { useAddQuizMarkMutation } from "../../features/quiz-mark/QuizMarksApi";
import { useSelector } from "react-redux";
import {
	handleQuizAnswerSelect,
	totalCorrectAnswers,
} from "./QuizSubmitFunctions";
import ButtonLoadingAnimation from "../../utils/Loading/ButtonLoadingAnimation";
import AlertBox from "../../utils/Alert/AlertBox";
import Alert from "../../utils/Alert/Alert";
import { useNavigate } from "react-router-dom";

const SelectedVideoQuiz = ({ quizzes, videoID }) => {
	const navigate = useNavigate();
	// User Details
	const { user } = useSelector((state) => state.auth);

	// Get videos query for fetch selected video details
	const { data: videoDetails, isError: videoDetailsError } =
		useGetCourseVideoDetailsQuery({
			videoID,
		});

	//Submit Quiz mark
	const [addQuizMark, { isLoading, isError, error, isSuccess }] =
		useAddQuizMarkMutation();

	//Quiz Answer state
	const [quiz_answers, setQuizAnswers] = useState([]);

	// Handle Submit Quiz
	const submitQuiz = () => {
		const totalCorrect = totalCorrectAnswers(quiz_answers);
		let totalWrong =
			quizzes?.length - totalCorrectAnswers(quiz_answers);
		const totalMark = quizzes?.length * 5;
		const mark = totalCorrect * 5;

		addQuizMark({
			student_id: user?.id,
			student_name: user?.name,
			video_id: videoDetails?.id,
			video_title: videoDetails?.title,
			totalQuiz: quizzes?.length,
			totalCorrect: totalCorrect,
			totalWrong: totalWrong,
			totalMark: totalMark,
			mark: mark,
		});
	};

	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);
	//error and success handlaing
	useEffect(() => {
		if (isError) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage(error.data);
		} else if (isSuccess) {
			setAlertOpen(true);
			SetAlertType("success");
			setMessage("Quiz submitted successfully");
			navigate("/leaderboard");
		}
	}, [error?.data, isError, isSuccess]);

	return (
		<>
			<section className="py-6 bg-primary">
				<div className="mx-auto max-w-7xl px-5 lg:px-0">
					<div className="mb-8">
						<h1 className="text-2xl font-bold">
							Quizzes for "
							{videoDetails?.title}"
						</h1>
						<p className="text-sm text-slate-200">
							Each question contains 5 Mark
						</p>
					</div>

					<div className="space-y-8 ">
						{quizzes?.map((quiz, index) => {
							return (
								<div className="quiz">
									<h4 className="question">
										Quiz{" "}
										{index +
											1}{" "}
										-{" "}
										{
											quiz?.question
										}
									</h4>
									<div className="quizOptions">
										{/* <!-- Option 1 --> */}
										{quiz?.options?.map(
											(
												option
											) => {
												return (
													<label
														for={`q${quiz?.id}_o${option?.id}`}
													>
														<input
															type="checkbox"
															id={`q${quiz?.id}_o${option?.id}`}
															onClick={() =>
																handleQuizAnswerSelect(
																	{
																		quiz,
																		option,
																		quiz_answers,
																		setQuizAnswers,
																	}
																)
															}
														/>

														{
															option?.option
														}
													</label>
												);
											}
										)}
									</div>
								</div>
							);
						})}
					</div>

					<button
						className="px-4 py-2 rounded-full bg-cyan   ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95  flex items-center justify-center gap-2"
						onClick={submitQuiz}
						disabled={isLoading}
					>
						Submit
						{isLoading && (
							<ButtonLoadingAnimation />
						)}
					</button>
				</div>
			</section>

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

export default SelectedVideoQuiz;
