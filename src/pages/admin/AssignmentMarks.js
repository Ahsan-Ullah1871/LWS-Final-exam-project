import React, { useState } from "react";
import AssignmentsMarksTable from "../../components/AssignmentsMarks/AssignmentsMarksTable";
import { useGetAssignmentsMarksQuery } from "../../features/assignments-marks/AssignmentsMarksApi";
import ErrorUI from "../../utils/Error/ErrorUi";
import UILoading from "../../utils/Loading/UILoading";

const AssignmentMarks = () => {
	// Get assignments marks query
	const {
		data: assignmentMarks,
		isLoading,
		isFetching,
		isError,
		error,
		isSuccess,
	} = useGetAssignmentsMarksQuery();

	//Decide Assignment UI
	let content = null;
	if (isFetching && isLoading)
		content = <UILoading message={"Assignments marks Loading"} />;
	else if (!isLoading && isError)
		content = <ErrorUI message={error?.message} />;
	else if (
		!isLoading &&
		!isError &&
		(assignmentMarks == undefined || assignmentMarks == null)
	)
		content = <UILoading message={"Assignments marks Loading"} />;
	else if (
		!isFetching &&
		!isLoading &&
		!isError &&
		assignmentMarks?.length == 0
	) {
		content = <UILoading message={"Assignments marks not found"} />;
	} else if (!isLoading && !isError && assignmentMarks?.length > 0) {
		content = (
			<div className="mx-auto max-w-full px-5 lg:px-20">
				<div className="px-3 py-20 bg-opacity-10">
					<ul className="assignment-status">
						<li>
							Total{" "}
							<span>
								{
									assignmentMarks?.length
								}
							</span>
						</li>
						<li>
							Pending{" "}
							<span>
								{
									assignmentMarks?.filter(
										(mark) =>
											mark.status ==
											"pending"
									)?.length
								}
							</span>
						</li>
						<li>
							Mark Sent{" "}
							<span>
								{
									assignmentMarks?.filter(
										(mark) =>
											mark.status ==
											"published"
									)?.length
								}
							</span>
						</li>
					</ul>
					<div className="overflow-x-auto mt-4">
						<AssignmentsMarksTable
							assignmentMarks={
								assignmentMarks
							}
						/>
					</div>
				</div>
			</div>
		);
	}

	return <section className="py-6 bg-primary">{content}</section>;
};

export default AssignmentMarks;
