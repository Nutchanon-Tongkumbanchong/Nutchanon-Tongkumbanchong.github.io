import React, { useState } from 'react';
import LineChart from '../components/Chart/LineChart';
import PieChart from '../components/Chart/PieChart';

const AnalyticsDashboard = () => {
  const [view, setView] = useState('daily'); // default view

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  // Sample data for charts
  const data = {
    daily: [/* daily spending data */],
    weekly: [/* weekly spending data */],
    monthly: [/* monthly spending data */],
  };

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <div>
        <label>
          <input
            type="radio"
            value="daily"
            checked={view === 'daily'}
            onChange={handleViewChange}
          />
          Daily
        </label>
        <label>
          <input
            type="radio"
            value="weekly"
            checked={view === 'weekly'}
            onChange={handleViewChange}
          />
          Weekly
        </label>
        <label>
          <input
            type="radio"
            value="monthly"
            checked={view === 'monthly'}
            onChange={handleViewChange}
          />
          Monthly
        </label>
      </div>
      <LineChart data={data[view]} />
      <PieChart data={data[view]} />
    </div>
  );
};

export default AnalyticsDashboard;