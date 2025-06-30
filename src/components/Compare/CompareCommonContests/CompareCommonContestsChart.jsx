import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CompareCommonContestsChart = ({
  userContestRankingHistory1,
  userContestRankingHistory2,
  username1,
  username2,
}) => {
  // Handle loading or invalid data
  if (
    !Array.isArray(userContestRankingHistory1) ||
    !Array.isArray(userContestRankingHistory2)
  ) {
    return <div>Loading or invalid contest data...</div>;
  }

  let contestMap1 = new Map();
  let w1 = 0, w2 = 0, tie = 0;

  userContestRankingHistory1.forEach(c => {
    if (c.attended && c.contest?.title) {
      contestMap1.set(c.contest.title, c.ranking);
    }
  });

  userContestRankingHistory2.forEach(c => {
    if (c.attended && c.contest?.title) {
      const title = c.contest.title;
      const rank2 = c.ranking;

      if (contestMap1.has(title)) {
        const rank1 = contestMap1.get(title);

        if (rank1 < rank2) {
          w1++;
        } else if (rank1 > rank2) {
          w2++;
        } else {
          tie++;
        }
      }
    }
  });

  const data = {
    labels: [username1, username2, 'Tie'],
    datasets: [
      {
        label: 'Contest Outcomes',
        data: [w1, w2, tie],
        backgroundColor: [
          'rgba(148, 216, 38, 0.8)',
          'rgba(4, 119, 198, 0.8)',
          'rgba(228, 28, 28, 0.8)',
        ],
        borderColor: [
          'rgba(148, 216, 38, 1)',
          'rgba(4, 119, 198, 1)',
          'rgba(228, 28, 28, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Head-to-Head Contest Results',
        font: {
          size: 18
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default CompareCommonContestsChart;
