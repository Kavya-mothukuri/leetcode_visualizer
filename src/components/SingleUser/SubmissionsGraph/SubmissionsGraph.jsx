import React from 'react'
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const SubmissionsGraph = ({submitStatsGlobal}) => {
    
      
  let Submissions=submitStatsGlobal.totalSubmissionNum[0].submissions;
  let Solved=submitStatsGlobal.acSubmissionNum[0].count;
  let Tried=submitStatsGlobal.totalSubmissionNum[0].count;

  const data = {
    labels: ['Tried', 'Solved', 'Submissions'],
    datasets: [
        {
            label: 'Count',
            data: [Tried, Solved, Submissions],
            backgroundColor: ['rgb(28, 109, 208, 0.8)'],
            borderColor: ['rgb(28, 109, 208, 0.9)'],
            borderWidth: 1
        },
    ]
};
const options = {
    indexAxis: 'y',
    plugins: {
        title: {
            display: true,
            text: 'Submissions'
        },
        legend: {
            display: false
        }
    },
    maintainAspectRatio: false
};

return (
    <div>
        <Bar data={data} options={options} height={350} />
    </div>
)
}

export default SubmissionsGraph
