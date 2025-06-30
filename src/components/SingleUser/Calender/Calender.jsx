import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays } from 'date-fns';
import { Tooltip as ReactTooltip } from 'react-tooltip'; // Named import
import 'react-tooltip/dist/react-tooltip.css'; // Import v5 styles

const Calender = ({ calendar }) => {
  if (!calendar || calendar.length === 0) {
    return <p style={{ textAlign: 'center' }}>No calendar data available.</p>;
  }

  const today = new Date();
  const oneYearAgo = subDays(today, 365);
  const tooltipId = 'heatmap-tooltip'; // Unique tooltip ID

  return (
    <div style={{ maxWidth: '100%', margin: 'auto', padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Submission Activity of</h3>
      <CalendarHeatmap
        startDate={oneYearAgo}
        endDate={today}
        values={calendar}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          if (value.count <= 2) return 'color-github-1';
          if (value.count <= 4) return 'color-github-2';
          if (value.count <= 8) return 'color-github-3';
          return 'color-github-4';
        }}
        tooltipDataAttrs={(value) =>
          value.date
            ? {
                'data-tooltip-id': tooltipId,
                'data-tooltip-content': `${value.date}: ${value.count} submission${value.count === 1 ? '' : 's'}`,
              }
            : { 'data-tooltip-id': tooltipId, 'data-tooltip-content': 'No submissions' }
        }
        showWeekdayLabels
      />
      <ReactTooltip id={tooltipId} /> {/* Match tooltipId */}
    </div>
  );
};

export default Calender; 