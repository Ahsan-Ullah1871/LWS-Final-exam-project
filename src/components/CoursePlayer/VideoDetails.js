import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetQuizzesQuery } from "../../features/quiz/QuizApi";
import { useGetAssignmentsQuery } from "../../features/assignments/AssignmentsApi";
import Modal from "../../utils/Modal/Modal";
import AlertBox from "../../utils/Alert/AlertBox";
import Alert from "../../utils/Alert/Alert";
import SubmitAssignmentForm from "../forms/assigment/SubmitAssignmentForm";
import { useGetAssignmentsMarksQuery } from "../../features/assignments-marks/AssignmentsMarksApi";
import { useGetQuizMarksQuery } from "../../features/quiz-mark/QuizMarksApi";
import { Link } from "react-router-dom";
import DisabledButton from "../../utils/Buttons/DisabledButton copy";

const VideoDetails = () => {
	// Selected Video Selector
	const { selectedVideo } = useSelector((state) => state.course);

	// User Details
	const { user } = useSelector((state) => state.auth);

	//Skip states
	const [skipFetch, setSkipFetch] = useState(true);

	//get quizzes
	const { data: quizzes } = useGetQuizzesQuery(
		{
			video_id: selectedVideo?.id,
		},
		{ skip: skipFetch }
	);

	//get assignment
	const { data: assignments } = useGetAssignmentsQuery(
		{
			video_id: selectedVideo?.id,
		},
		{ skip: skipFetch }
	);

	//get assignment mark base on student id and assignment id
	const { data: assignmentMarks } = useGetAssignmentsMarksQuery();

	const IsCurrentAssignmentSubmitted =
		assignmentMarks?.filter(
			(assignment_mark) =>
				(assignments?.length > 0
					? assignment_mark?.assignment_id ===
					  assignments[0]?.id
					: false) &&
				assignment_mark?.student_id == user.id
		)?.length > 0
			? true
			: false;

	//get quiz mark base on student id and video id
	const { data: quizMarks } = useGetQuizMarksQuery();

	const IsCurrentStudentQuizSubmitted =
		quizMarks?.filter(
			(quiz_mark) =>
				quiz_mark?.video_id == selectedVideo?.id &&
				quiz_mark?.student_id == user.id
		)?.length > 0
			? true
			: false;

	//Fetch assignments and quizzes after fetch details
	useEffect(() => {
		if (selectedVideo?.id) {
			setSkipFetch(false);
		}
	}, [selectedVideo]);

	// modal state
	const [modalOpen, setModalOpen] = useState(false);

	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);

	return (
		<>
			<div className="col-span-full w-full space-y-8 lg:col-span-2">
				<iframe
					width="100%"
					className="aspect-video"
					src={`${selectedVideo?.url}?autoplay=1`}
					title={selectedVideo?.title}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>

				<div>
					<h1 className="text-lg font-semibold tracking-tight text-slate-100">
						{selectedVideo?.title}
					</h1>
					<h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
						Uploaded on 23 February 2020
					</h2>

					<div className="flex gap-4">
						{assignments?.length > 0 &&
							(!IsCurrentAssignmentSubmitted ? (
								<button
									className={[
										"px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary",
									].join(" ")}
									disabled={
										IsCurrentAssignmentSubmitted
									}
									onClick={(e) => {
										e.stopPropagation();
										setModalOpen(
											true
										);
									}}
								>
									এসাইনমেন্ট
								</button>
							) : (
								<DisabledButton
									title={
										"এসাইনমেন্ট"
									}
								/>
							))}

						{quizzes?.length > 0 &&
							(!IsCurrentStudentQuizSubmitted ? (
								<Link
									to={`/quiz/${selectedVideo?.id}`}
									className="px-3 font-bold py-2 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
								>
									{`কুইজে অংশগ্রহণ  করুন`}
								</Link>
							) : (
								<DisabledButton
									title={`কুইজে অংশগ্রহণ করুন`}
								/>
							))}
					</div>
					<p className="mt-4 text-sm text-slate-400 leading-6">
						{selectedVideo?.description}
					</p>
				</div>
			</div>

			{/*Submit Assignment Modal UI */}
			<Modal
				id="assignment-modal"
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				modalDialogWidth="max-h-[80VH]  max-w-[375px] md:max-w-lg min-w-max w-full "
			>
				<SubmitAssignmentForm
					setModal={setModalOpen}
					setAlertOpen={setAlertOpen}
					SetAlertType={SetAlertType}
					setMessage={setMessage}
					assignment={
						assignments?.length > 0 &&
						assignments[0]
					}
				/>
			</Modal>

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

export default VideoDetails;
