import React, { useEffect, useState } from "react";

import {
	useAddQuizzesMutation,
	useEditQuizMutation,
	useGetQuizzesQuery,
} from "../../../features/quiz/QuizApi";
import { useGetVideosQuery } from "../../../features/videos/VideosApi";
import PrimaryButton from "../../../utils/Buttons/PrimaryButton";
import SecondaryButton from "../../../utils/Buttons/SeconDaryButton";
import Dropdown from "../../../utils/Dropdown/Dropdowm";
import InputField from "../../../utils/FormFileds/InputField";
import SelectField from "../../../utils/FormFileds/SelectField";
import TextArea from "../../../utils/FormFileds/TextArea";
import { questionOptionFields } from "./quizOptionFields";

const EditQuizForm = ({
	setModal,
	setAlertOpen,
	SetAlertType,
	setMessage,
	quiz_details,
}) => {
	const [formState, setFormState] = useState({});
	const [questionOption, setQuestionOption] = useState({
		option: "",
		isCorrect: false,
	});

	//set default value
	useEffect(() => {
		setFormState(quiz_details);
	}, [quiz_details]);

	// Get Videos query
	const { data: videos } = useGetVideosQuery();

	//Edit quiz mutation
	const [editQuiz, { data, isLoading, isError, error, isSuccess }] =
		useEditQuizMutation();

	// Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();

		if (formState?.options?.length < 4) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage("Please add atlist 4 answer options!");
			return false;
		} else {
			editQuiz({ data: formState, quiz_id: formState?.id });
		}
	};

	//closeModal
	const closeModalFunction = () => {
		setModal(false);
	};

	//error and success handling
	useEffect(() => {
		if (isError) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage(error.data);
		} else if (isSuccess) {
			setAlertOpen(true);
			SetAlertType("success");
			setMessage("Quiz edited successfully");
			closeModalFunction();
		}
	}, [error?.data, isError, isSuccess]);

	//handleSelectFromOptions
	const handleSelectFromOptions = (video_id) => {
		const selected_video_id = Number(video_id);
		const selected_video = videos.filter(
			(video) => video.id == selected_video_id
		)[0];
		setFormState((prev) => ({
			...prev,
			video_id: selected_video_id,
			video_title: selected_video.title,
		}));
	};

	//handle_dropdown_close
	const handle_dropdown_close = (e) => {
		if (questionOption?.option?.length == 0) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage("Please! Write an option  ...");
		} else {
			let id =
				formState.options?.length > 0
					? formState.options?.length + 1
					: 1;
			setFormState((prev) => ({
				...prev,
				options:
					prev.options?.length > 0
						? [
								...prev.options,
								{
									...questionOption,
									id,
								},
						  ]
						: [{ ...questionOption, id }],
			}));

			setQuestionOption({ option: "", isCorrect: false });
		}
	};

	//handleDeleteAnswer
	const handleDeleteAnswer = (id) => {
		setFormState((prev) => ({
			...prev,
			options:
				prev.options.filter((option) => option?.id !== id)
					?.length > 0
					? prev.options
							.filter(
								(option) =>
									option?.id !== id
							)
							.map((item, index) => ({
								...item,
								id: index + 1,
							}))
					: prev.options.filter(
							(option) => option?.id !== id
					  ),
		}));
	};

	return (
		<>
			<div className="w-full min-h-min bg-white px-5 py-8 text-gray-800">
				<h1 className=" text-xl font-medium text-[#171725]  mb-5  ">
					Edit quiz
				</h1>

				<form
					className="flex flex-col gap-5"
					id="edit-quiz-form"
					onSubmit={handleSubmit}
				>
					<InputField
						setFormState={setFormState}
						key_name="question"
						title="Question"
						formState={formState}
						isRequired={true}
					/>
					<SelectField
						setFormState={setFormState}
						key_name="video_id"
						title="Select video"
						formState={formState}
						isRequired={true}
						handleValueChange={
							handleSelectFromOptions
						}
						options={videos?.map((video) => ({
							label: video.title,
							value: video.id,
						}))}
					/>

					{formState?.options?.length > 0 && (
						<table className="divide-y-1 text-base divide-gray-600 w-full">
							<thead className="">
								<tr>
									<th className="table-th !text-green-700">
										Answer
									</th>
									<th className="table-th !text-green-700">
										iSCorrect
									</th>

									<th className="table-th justify-center  !text-green-700">
										Action
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-slate-600/50 text-gray-800">
								{formState?.options?.map(
									(answer) => {
										return (
											<tr>
												<td className="table-td">
													{
														answer.option
													}
												</td>
												<td className="table-td">
													{answer?.isCorrect
														? "YES"
														: "No"}
												</td>
												<td className="table-td flex gap-x-2 justify-center">
													<svg
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
														onClick={(
															e
														) => {
															e.stopPropagation();
															handleDeleteAnswer(
																answer.id
															);
														}}
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
														/>
													</svg>
												</td>
											</tr>
										);
									}
								)}
							</tbody>
						</table>
					)}

					{/* Dropdon for answer */}
					<Dropdown
						values={questionOption}
						setValues={setQuestionOption}
						dropdown_btn_title="Add question answer"
						dropdown_options={
							questionOptionFields
						}
						handle_dropdown_close={
							handle_dropdown_close
						}
						dropdown_close_btn_title="Close"
						dropdown_add_btn_title="Add new answer"
						dropdown_add_btn_disable={
							questionOption?.option
								?.length > 0
								? false
								: true
						}
					/>

					{/* Buttons */}

					<div className="flex justify-end items-center gap-5  mt-5  mb-10">
						<SecondaryButton
							title={"Cancel"}
							type="button"
							handleClickFunction={() =>
								closeModalFunction()
							}
						/>
						<PrimaryButton
							title={"Save"}
							type="submit"
							isLoading={isLoading}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default EditQuizForm;
