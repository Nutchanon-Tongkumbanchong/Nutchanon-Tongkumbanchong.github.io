import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, options }) => {
  return (
    <div>
      <h2>Spending Distribution</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;