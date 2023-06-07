import React, { useEffect, useState } from "react";
import { useAddVideoMutation } from "../../../features/videos/VideosApi";
import PrimaryButton from "../../../utils/Buttons/PrimaryButton";
import SecondaryButton from "../../../utils/Buttons/SeconDaryButton";
import InputField from "../../../utils/FormFileds/InputField";
import TextArea from "../../../utils/FormFileds/TextArea";

const AddVideoForm = ({ setModal, setAlertOpen, SetAlertType, setMessage }) => {
	const [formState, setFormState] = useState({});

	//Add video mutation
	const [addVideo, { data, isLoading, isError, error, isSuccess }] =
		useAddVideoMutation();

	// Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();
		addVideo({ ...formState, createdAt: new Date() });
	};

	//closeModal
	const closeModalFunction = () => {
		setModal(false);
		setFormState({});
		document.getElementById("add-video-form").reset();
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
			setMessage("New video added successfully");
			closeModalFunction();
		}
	}, [error?.data, isError, isSuccess]);

	return (
		<>
			<div className="w-full min-h-min bg-white px-5 py-8 text-gray-800">
				<h1 className=" text-xl font-medium text-[#171725]  mb-5  ">
					Add New Video
				</h1>

				<form
					action=""
					className="flex flex-col gap-5"
					id="add-video-form"
					onSubmit={handleSubmit}
				>
					<InputField
						setFormState={setFormState}
						key_name="title"
						title="Title"
						formState={formState}
						isRequired={true}
					/>
					<TextArea
						setFormState={setFormState}
						key_name="description"
						title="Description"
						formState={formState}
						isRequired={true}
					/>
					<InputField
						setFormState={setFormState}
						key_name="url"
						title="URL"
						formState={formState}
						isRequired={true}
						info={
							"Please provide the YouTube video URL that is contained within the embed code. The video URL can typically be found within the 'src' attribute of the 'iframe' tag in the embed code.  "
						}
					/>
					<InputField
						setFormState={setFormState}
						key_name="views"
						title="Views"
						formState={formState}
						isRequired={true}
					/>
					<InputField
						setFormState={setFormState}
						key_name="duration"
						title="Duration"
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

export default AddVideoForm;
