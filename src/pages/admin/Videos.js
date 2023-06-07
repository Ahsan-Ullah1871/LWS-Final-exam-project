import React, { useState } from "react";
import AddVideoForm from "../../components/forms/video/AddVideoForm";
import VideosTable from "../../components/Videos/VideosTable";
import { useGetVideosQuery } from "../../features/videos/VideosApi";
import Alert from "../../utils/Alert/Alert";
import AlertBox from "../../utils/Alert/AlertBox";
import ErrorUI from "../../utils/Error/ErrorUi";
import UILoading from "../../utils/Loading/UILoading";
import Modal from "../../utils/Modal/Modal";

const Videos = () => {
	// Get videos query
	const {
		data: videos,
		isLoading,
		isFetching,
		isError,
		error,
		isSuccess,
	} = useGetVideosQuery();

	//Add Video modal state
	const [modalOpen, setModalOpen] = useState(false);

	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);

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
		content = <VideosTable videos={videos} />;
	}

	return (
		<>
			{/* Videos UI */}
			<section className="py-6 bg-primary">
				<div className="mx-auto max-w-full px-5 lg:px-20">
					<div className="px-3 py-20 bg-opacity-10">
						<div className="w-full flex">
							<button
								className="btn ml-auto"
								onClick={(e) => {
									e.stopPropagation();
									setModalOpen(
										true
									);
								}}
							>
								Add Video
							</button>
						</div>
						<div className="overflow-x-auto mt-4">
							{content}
						</div>
					</div>
				</div>
			</section>

			{/*Add Video Modal UI */}
			<Modal
				id="add-video-modal"
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				modalDialogWidth="max-h-[80VH]  max-w-[375px] md:max-w-lg min-w-max w-full "
			>
				<AddVideoForm
					setModal={setModalOpen}
					setAlertOpen={setAlertOpen}
					SetAlertType={SetAlertType}
					setMessage={setMessage}
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

export default Videos;
