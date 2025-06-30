// ContestInfo.jsx
import React from 'react';
import CustomTable from './CustomTable';

const ContestInfo = ({ userContests }) => {
  if (!userContests) {
    return <div>No contest information available.</div>;
  }

  const totalCount = userContests.attendedContestsCount ?? 'N/A';
  const rating = userContests.rating ?? 'N/A';
  const globalRanking = userContests.globalRanking ?? 'N/A';
  const topPercentage = userContests.topPercentage ?? 'N/A';
  const badge = userContests.badge?.name ?? 'N/A';

  const rows = [
    { id: 1, name: 'No of Contests Participated', data: totalCount },
    { id: 2, name: 'Current Rating', data: rating },
    { id: 3, name: 'Global Rank', data: globalRanking },
    { id: 4, name: 'Top Percentage', data: topPercentage },
    { id: 5, name: 'Badge', data: badge },
  ];

  return (
    <div>
      <CustomTable rows={rows} TableName="Contest Info" />
    </div>
  );
};

export default ContestInfo;