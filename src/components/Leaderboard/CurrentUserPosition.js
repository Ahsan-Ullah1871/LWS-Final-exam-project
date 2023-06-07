import React from "react";
import { useSelector } from "react-redux";

const CurrentUserPosition = ({ RankList }) => {
	const { user } = useSelector((state) => state.auth);

	//USer rank
	let userRank = RankList?.filter((list) => list?.student_id == user.id);

	return userRank?.length > 0 ? (
		<div>
			<h3 className="text-lg font-bold">
				Your Position in Leaderboard
			</h3>
			<table className="text-base w-full border border-slate-600/50 rounded-md my-4">
				<thead>
					<tr>
						<th className="table-th !text-center">
							Rank
						</th>
						<th className="table-th !text-center">
							Name
						</th>
						<th className="table-th !text-center">
							Quiz Mark
						</th>
						<th className="table-th !text-center">
							Assignment Mark
						</th>
						<th className="table-th !text-center">
							Total
						</th>
					</tr>
				</thead>

				<tbody>
					<tr className="border-2 border-cyan">
						<td className="table-td text-center font-bold">
							{userRank[0]?.rank}
						</td>
						<td className="table-td text-center font-bold">
							{userRank[0]?.student_name}
						</td>
						<td className="table-td text-center font-bold">
							{userRank[0]?.quiz_marks}
						</td>
						<td className="table-td text-center font-bold">
							{
								userRank[0]
									?.assignments_marks
							}
						</td>
						<td className="table-td text-center font-bold">
							{userRank[0]?.total_marks}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	) : (
		<div>
			<h3 className="text-lg font-bold text-center">
				Your Position is not available currently
			</h3>
		</div>
	);
};

export default CurrentUserPosition;
