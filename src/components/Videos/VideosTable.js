import React, { useEffect, useState } from "react";
import { useDeleteVideoMutation } from "../../features/videos/VideosApi";
import VideoRow from "./VideoRow";
import AlertBox from "../../utils/Alert/AlertBox";
import Alert from "../../utils/Alert/Alert";

const VideosTable = ({ videos = [] }) => {
	//Delete video mutation
	const [deleteVideo, { data, isLoading, isError, error, isSuccess }] =
		useDeleteVideoMutation();

	// Handle Submit
	const handleDelete = (id) => {
		deleteVideo({ video_id: id });
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
			setMessage(" video deleted successfully");
		}
	}, [
		SetAlertType,
		error?.data,
		isError,
		isSuccess,
		setAlertOpen,
		setMessage,
	]);

	return (
		<>
			{" "}
			<table className="divide-y-1 text-base divide-gray-600 w-full">
				<thead>
					<tr>
						<th className="table-th">
							Video Title
						</th>
						<th className="table-th">
							Description
						</th>
						<th className="table-th">Action</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-600/50">
					{videos?.map((video) => {
						return (
							<VideoRow
								video={video}
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

export default VideosTable;
