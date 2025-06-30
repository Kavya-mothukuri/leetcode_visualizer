import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompareSubmissionsGraph = ({ submitStatsGlobal1, submitStatsGlobal2, username1, username2 }) => {

  let Submissions1 = submitStatsGlobal1.totalSubmissionNum[0].submissions;
  let Solved1 = submitStatsGlobal1.acSubmissionNum[0].count;
  let Tried1 = submitStatsGlobal1.totalSubmissionNum[0].count;

  let Submissions2 = submitStatsGlobal2.totalSubmissionNum[0].submissions;
  let Solved2 = submitStatsGlobal2.acSubmissionNum[0].count;
  let Tried2 = submitStatsGlobal2.totalSubmissionNum[0].count;

  const data = {
    labels: ['Tried', 'Solved', 'Submissions'],
    datasets: [
      {
        label: username1,
        data: [Tried1, Solved1, Submissions1],
        backgroundColor: 'rgba(228, 28, 28, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: username2,
        data: [Tried2, Solved2, Submissions2],
        backgroundColor: 'rgba(4, 119, 198, 0.8)',
        borderColor: 'rgba(28, 109, 208, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    plugins: {
      title: {
        display: true,
        text: 'Submissions',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CompareSubmissionsGraph;
