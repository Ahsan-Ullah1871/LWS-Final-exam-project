import React from "react";
import TopListRow from "./TopListRow";

const TopList = ({ RankList }) => {
	// Filtering top 20 list
	const findTop20List = (list) => {
		return list.rank > 0 && list.rank < 21;
	};

	return (
		RankList?.length > 0 && (
			<div className="my-8">
				<h3 className="text-lg font-bold">Top 20 Result</h3>
				<table className="text-base w-full border border-slate-600/50 rounded-md my-4">
					<thead>
						<tr className="border-b border-slate-600/50">
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
						{RankList?.filter(findTop20List).map(
							(list) => (
								<TopListRow
									list={list}
								/>
							)
						)}
					</tbody>
				</table>
			</div>
		)
	);
};

export default TopList;
