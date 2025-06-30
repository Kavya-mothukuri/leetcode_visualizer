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

const CompareContestRatingGraph = ({
  userContestRankingHistory1,
  userContestRankingHistory2,
  username1,
  username2,
}) => {
  // 🛡️ Guard against undefined props
  if (!Array.isArray(userContestRankingHistory1) || !Array.isArray(userContestRankingHistory2)) {
    return <div>Loading or invalid data...</div>;
  }

  const chartData = useMemo(() => {
    const history1 = userContestRankingHistory1.filter(c => c.attended);
    const history2 = userContestRankingHistory2.filter(c => c.attended);

    const allContestsSet = new Set();
    history1.forEach(c => allContestsSet.add(c.contest.title));
    history2.forEach(c => allContestsSet.add(c.contest.title));

    const sortedTitles = Array.from(allContestsSet).sort();

    const ratingsMap1 = new Map(history1.map(c => [c.contest.title, c.rating]));
    const ratingsMap2 = new Map(history2.map(c => [c.contest.title, c.rating]));

    const data1 = [];
    const data2 = [];

    let prevRating1 = null;
    let prevRating2 = null;

    for (const title of sortedTitles) {
      if (ratingsMap1.has(title)) {
        prevRating1 = ratingsMap1.get(title);
      }
      if (ratingsMap2.has(title)) {
        prevRating2 = ratingsMap2.get(title);
      }

      data1.push({ x: title, y: prevRating1 });
      data2.push({ x: title, y: prevRating2 });
    }

    return {
      labels: sortedTitles,
      datasets: [
        {
          label: username1,
          data: data1,
          backgroundColor: 'rgba(228, 28, 28, 0.8)',
          borderColor:  'rgba(228, 28, 28, 1)',
          pointBackgroundColor: 'red',
          tension: 0.2,
        },
        {
          label: username2,
          data: data2,
          backgroundColor: 'rgba(4, 119, 198, 0.8)',
          borderColor: 'rgba(4, 119, 198, 1)',
          pointBackgroundColor: 'blue',
          tension: 0.2,
        },
      ],
    };
  }, [userContestRankingHistory1, userContestRankingHistory2, username1, username2]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Contest Rating Comparison',
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
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
    <div style={{ height: '500px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CompareContestRatingGraph;
