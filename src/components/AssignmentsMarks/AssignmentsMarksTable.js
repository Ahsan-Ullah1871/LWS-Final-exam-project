import React, { useState } from "react";
import Alert from "../../utils/Alert/Alert";
import AlertBox from "../../utils/Alert/AlertBox";
import AssignmentMarkRow from "./AssignmentMarkRow";

const AssignmentsMarksTable = ({ assignmentMarks = [] }) => {
	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);

	return (
		<>
			{/* Assignment mark UI */}
			<table className="divide-y-1 text-base divide-gray-600 w-full">
				<thead>
					<tr>
						<th className="table-th">
							Assignment
						</th>
						<th className="table-th">Date</th>
						<th className="table-th">
							Student Name
						</th>
						<th className="table-th">
							Repo Link
						</th>
						<th className="table-th">Mark</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-600/50">
					{assignmentMarks?.map((assignmentMark) => (
						<AssignmentMarkRow
							key={assignmentMark.id}
							assignmentMark={assignmentMark}
							setAlertOpen={setAlertOpen}
							SetAlertType={SetAlertType}
							setMessage={setMessage}
						/>
					))}
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

export default AssignmentsMarksTable;
