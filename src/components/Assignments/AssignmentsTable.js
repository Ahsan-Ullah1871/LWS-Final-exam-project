import React, { useEffect, useState } from "react";
import {
	useDeleteAssignmentMutation,
	useGetAssignmentsQuery,
} from "../../features/assignments/AssignmentsApi";
import Alert from "../../utils/Alert/Alert";
import AlertBox from "../../utils/Alert/AlertBox";
import ErrorUI from "../../utils/Error/ErrorUi";
import UILoading from "../../utils/Loading/UILoading";
import AssignmentRow from "./AssignmentRow";

const AssignmentsTable = () => {
	// Get assignments query
	const {
		data: assignments,
		isLoading,
		isFetching,
		isError,
		error,
		isSuccess,
	} = useGetAssignmentsQuery();

	//Delete Assignment mutation
	const [
		deleteAssignment,
		{
			isLoading: deleteLoading,
			isError: IsDeleteAssignmentError,
			isSuccess: deleteAssignmentSuccess,
			error: deleteAssignmentError,
		},
	] = useDeleteAssignmentMutation();

	//Add assignment modal state
	const [modalOpen, setModalOpen] = useState(false);

	//handle delete assignment

	const handleDelete = (id) => {
		deleteAssignment({ assignment_id: id });
	};

	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);

	//Decide Assignment UI
	let content = null;
	if (isFetching && isLoading)
		content = <UILoading message={"Assignments Loading"} />;
	else if (!isLoading && isError)
		content = <ErrorUI message={error?.message} />;
	else if (
		!isLoading &&
		!isError &&
		(assignments == undefined || assignments == null)
	)
		content = <UILoading message={"Assignments Loading"} />;
	else if (
		!isFetching &&
		!isLoading &&
		!isError &&
		assignments?.length == 0
	) {
		content = <UILoading message={"Assignment not found"} />;
	} else if (!isLoading && !isError && assignments?.length > 0) {
		content = (
			<table className="divide-y-1 text-base divide-gray-600 w-full">
				{/* Table Header */}
				<thead>
					<tr>
						<th className="table-th">Title</th>
						<th className="table-th">
							Video Title
						</th>
						<th className="table-th">Mark</th>
						<th className="table-th">Action</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-600/50">
					{assignments?.map((assignment) => {
						return (
							<AssignmentRow
								key={assignment.id}
								assignment={assignment}
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

	//Delete assignment error and success handling
	useEffect(() => {
		if (IsDeleteAssignmentError) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage(deleteAssignmentError.data);
		} else if (deleteAssignmentSuccess) {
			setAlertOpen(true);
			SetAlertType("success");
			setMessage("Assignment deleted successfully");
		}
	}, [
		IsDeleteAssignmentError,
		SetAlertType,
		deleteAssignmentError?.data,
		deleteAssignmentSuccess,
		setAlertOpen,
		setMessage,
	]);

	return (
		<>
			<div className="overflow-x-auto mt-4">{content}</div>

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

export default AssignmentsTable;
