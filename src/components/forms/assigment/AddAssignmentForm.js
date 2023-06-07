import React, { useEffect, useState } from "react";
import {
	useAddAssignmentsMutation,
	useGetAssignmentsQuery,
} from "../../../features/assignments/AssignmentsApi";
import { useGetVideosQuery } from "../../../features/videos/VideosApi";
import PrimaryButton from "../../../utils/Buttons/PrimaryButton";
import SecondaryButton from "../../../utils/Buttons/SeconDaryButton";
import InputField from "../../../utils/FormFileds/InputField";
import SelectField from "../../../utils/FormFileds/SelectField";
import TextArea from "../../../utils/FormFileds/TextArea";

const AddAssignmentForm = ({
	setModal,
	setAlertOpen,
	SetAlertType,
	setMessage,
}) => {
	const [formState, setFormState] = useState({});
	const [videosOptions, setVideosOptions] = useState([]);

	// Get assignments query
	const { data: assignments } = useGetAssignmentsQuery();

	// Get Videos query
	const { data: videos } = useGetVideosQuery();

	//set default value for videos options
	useEffect(() => {
		setVideosOptions(
			videos
				?.filter(
					(video) =>
						!assignments?.find(
							(assignment) =>
								assignment?.video_id ===
								video?.id
						)
				)
				?.map((video) => ({
					label: video?.title,
					value: video?.id,
				}))
		);
	}, [videos, assignments]);

	//Add assignment mutation
	const [addAssignment, { data, isLoading, isError, error, isSuccess }] =
		useAddAssignmentsMutation();

	// Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();
		addAssignment({
			...formState,
			totalMark: Number(formState?.totalMark),
		});
	};

	//closeModal
	const closeModalFunction = () => {
		setModal(false);
		setFormState({});
		document.getElementById("add-assignment-form").reset();
	};

	//error and success handlaing
	useEffect(() => {
		if (isError) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage(error.data);
		} else if (isSuccess) {
			setAlertOpen(true);
			SetAlertType("success");
			setMessage("New assignment added successfully");
			closeModalFunction();
		}
	}, [error?.data, isError, isSuccess]);

	//handleSelectFromOptions
	const handleSelectFromOptions = (video_id) => {
		const selected_video_id = Number(video_id);
		const selected_video = videos?.filter(
			(video) => video.id == selected_video_id
		)[0];
		setFormState((prev) => ({
			...prev,
			video_id: selected_video_id,
			video_title: selected_video.title,
		}));
	};

	return (
		<>
			<div className="w-full min-h-min bg-white px-5 py-8 text-gray-800">
				<h1 className=" text-xl font-medium text-[#171725]  mb-5  ">
					Add New assignment
				</h1>

				<form
					action=""
					className="flex flex-col gap-5"
					id="add-assignment-form"
					onSubmit={handleSubmit}
				>
					<InputField
						setFormState={setFormState}
						key_name="title"
						title="Title"
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
						options={videosOptions}
					/>
					<InputField
						setFormState={setFormState}
						key_name="totalMark"
						title="Assignment Total Mark"
						formState={formState}
						isRequired={true}
						type={"number"}
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

export default AddAssignmentForm;
