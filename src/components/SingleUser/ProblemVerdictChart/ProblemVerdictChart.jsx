import React from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProblemVerdictChart = ({ submitStatsGlobal }) => {
  let easy = 0, medium = 0, hard = 0;

  if (submitStatsGlobal?.acSubmissionNum) {
    submitStatsGlobal.acSubmissionNum.forEach((item) => {
      if (item.difficulty === 'Easy') easy = item.count;
      else if (item.difficulty === 'Medium') medium = item.count;
      else if (item.difficulty === 'Hard') hard = item.count;
    });
  }

  const data = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Solved Problems',
        data: [easy, medium, hard],
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
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Verdicts',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '350px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProblemVerdictChart;
