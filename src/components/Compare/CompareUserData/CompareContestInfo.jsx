import React from 'react'
import CompareCustomTable from './CompareCustomTable';
const CompareContestInfo = ({userContests1,userContests2,username1,username2}) => {
  if (!userContests1 || !userContests2) {
    return <div>No Contest Data avilable</div>;
  }
    const totalCount1 = userContests1.attendedContestsCount ?? 'N/A';
    const rating1 = userContests1.rating ?? 'N/A';
    const globalRanking1 = userContests1.globalRanking ?? 'N/A';
    const topPercentage1 = userContests1.topPercentage ?? 'N/A';
    const badge1 = userContests1.badge?.name ?? 'N/A';

    const totalCount2 = userContests2.attendedContestsCount ?? 'N/A';
    const rating2 = userContests2.rating ?? 'N/A';
    const globalRanking2 = userContests2.globalRanking ?? 'N/A';
    const topPercentage2 = userContests2.topPercentage ?? 'N/A';
    const badge2 = userContests2.badge.name ?? 'N/A';
  
    const rows = [
        { id: 1, name: 'No of Contests Participated', data1: totalCount1 , data2:totalCount2},
        { id: 2, name: 'Current Rating', data1: rating1,data2:rating2 },
        { id: 3, name: 'Global Rank', data1: globalRanking1,data2:globalRanking2 },
        { id: 4, name: 'Top Percentage', data1: topPercentage1,data2:topPercentage2 },
        { id: 5, name: 'Badge', data1: badge1,data2:badge2 },
    ];
  return (
    <div>
       <div>
            <CompareCustomTable rows={rows} TableName='Contest Info' username1={username1} username2={username2} />
        </div>
    </div>
  )
}

export default CompareContestInfo
