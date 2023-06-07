import React from "react";

const TopListRow = ({ list }) => {
	return (
		<tr className="border-b border-slate-600/50">
			<td className="table-td text-center">{list?.rank}</td>
			<td className="table-td text-center">
				{list?.student_name}
			</td>
			<td className="table-td text-center">
				{list?.quiz_marks}
			</td>
			<td className="table-td text-center">
				{list?.assignments_marks}
			</td>
			<td className="table-td text-center">
				{list?.total_marks}
			</td>
		</tr>
	);
};

export default TopListRow;
