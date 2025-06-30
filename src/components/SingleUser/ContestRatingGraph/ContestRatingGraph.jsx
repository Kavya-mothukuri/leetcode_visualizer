import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ContestRatingGraph = ({ userContestRankingHistory }) => {
  const chartData = useMemo(() => {
    const labels = [];
    const ratings = [];
    const pointColors = [];

    // Compute maxRating dynamically
    const attendedContests = userContestRankingHistory.filter(c => c.attended);
    const maxRating = Math.max(...attendedContests.map(c => c.rating), 0);

    for (const contest of attendedContests) {
      const title = contest.contest.title;
      const rating = contest.rating;

      labels.push(title);
      ratings.push({ x: title, y: rating });
      pointColors.push(
        rating === maxRating ? 'red' : 'rgba(28, 109, 208, 0.9)'
      );
    }

    return {
      labels,
      datasets: [
        {
          label: 'Rating',
          data: ratings,
          backgroundColor: 'rgba(28, 109, 208, 0.3)',
          borderColor: 'rgba(28, 109, 208, 0.7)',
          pointBackgroundColor: pointColors,
          tension: 0.2,
        },
      ],
    };
  }, [userContestRankingHistory]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Contests Rating',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Contest Title',
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Rating',
        },
      },
    },
  }), []);

  return (
    <div style={{ height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ContestRatingGraph;
