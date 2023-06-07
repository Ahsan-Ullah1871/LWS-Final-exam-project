import React, { useEffect, useState } from "react";
import { useEditAssignmentMarkMutation } from "../../features/assignments-marks/AssignmentsMarksApi";

const AssignmentMarkRow = ({
	assignmentMark = {},
	setAlertOpen,
	SetAlertType,
	setMessage,
}) => {
	//assignmentMark
	const {
		id,
		student_id,
		student_name,
		assignment_id,
		title,
		createdAt,
		totalMark,
		mark,
		repo_link,
		status,
	} = assignmentMark;

	// Mark value in state
	const [markValue, setMarkValue] = useState(mark);

	//
	//Add assignment mutation
	const [
		editAssignmentMark,
		{ data, isLoading, isError, error, isSuccess },
	] = useEditAssignmentMarkMutation();

	//error and success handlaing
	useEffect(() => {
		if (isError) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage(error.data);
		} else if (isSuccess) {
			setAlertOpen(true);
			SetAlertType("success");
			setMessage(" Assignment mark published successfully");
		}
	}, [error?.data, isError, isSuccess]);

	//
	const handlePublishMark = () => {
		if (Number(markValue) > Number(totalMark)) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage(
				`Total mark of this assignment is ${totalMark}`
			);
			return false;
		} else {
			editAssignmentMark({
				data: {
					mark: Number(markValue),
					status: "published",
				},
				assignment_mark_id: id,
			});
		}
	};

	return (
		<tr>
			<td className="table-td">{title}</td>
			<td className="table-td">{createdAt}</td>
			<td className="table-td">{student_name}</td>
			<td className="table-td">{repo_link}</td>
			{status == "pending" ? (
				<td className="table-td input-mark">
					<input
						max={totalMark}
						value={markValue}
						onChange={(e) =>
							setMarkValue(e.target.value)
						}
					/>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
						onClick={(e) => {
							e.stopPropagation();
							handlePublishMark();
						}}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4.5 12.75l6 6 9-13.5"
						/>
					</svg>
				</td>
			) : (
				<td className="table-td">{mark}</td>
			)}
		</tr>
	);
};

export default AssignmentMarkRow;
