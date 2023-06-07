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
import { useAddAssignmentMarkMutation } from "../../../features/assignments-marks/AssignmentsMarksApi";
import { useSelector } from "react-redux";

const SubmitAssignmentForm = ({
	setModal,
	setAlertOpen,
	SetAlertType,
	setMessage,
	assignment,
}) => {
	// Selected Video Selector
	const { selectedVideo } = useSelector((state) => state.course);

	// User Details
	const { user } = useSelector((state) => state.auth);

	const [formState, setFormState] = useState({});

	//set default value in form state
	useEffect(() => {
		setFormState((prev) => ({
			...prev,
			student_id: user?.id,
			student_name: user.name,
			assignment_id: assignment?.id,
			title: assignment?.title,
			createdAt: new Date(),
			totalMark: Number(assignment?.totalMark),
			mark: 0,
			status: "pending",
		}));
	}, [
		assignment?.id,
		assignment?.title,
		assignment?.totalMark,
		user.name,
	]);

	//Add assignment mark mutation
	const [
		addAssignmentMark,
		{ data, isLoading, isError, error, isSuccess },
	] = useAddAssignmentMarkMutation();

	// Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();
		addAssignmentMark({ ...formState });
	};

	//closeModal
	const closeModalFunction = () => {
		setModal(false);
		setFormState({});
		document.getElementById("submit-assignment-form").reset();
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
			setMessage("Assignment submitted successfully");
			closeModalFunction();
		}
	}, [error?.data, isError, isSuccess]);

	return (
		<>
			<div className="w-full min-h-min bg-white px-5 py-8 text-gray-800">
				<h1 className=" text-xl font-medium text-[#171725]  mb-5  ">
					Submit assignment
				</h1>

				<form
					action=""
					className="flex flex-col gap-5"
					id="submit-assignment-form"
					onSubmit={handleSubmit}
				>
					<InputField
						setFormState={setFormState}
						key_name="repo_link"
						title="Repo Link"
						formState={formState}
						isRequired={true}
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
							title={
								"Submit your assignment"
							}
							type="submit"
							isLoading={isLoading}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default SubmitAssignmentForm;
