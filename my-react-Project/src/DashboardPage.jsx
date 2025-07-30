import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import LineChart from './LineChart';
import PieChart from './PieChart';

function weekStartDate(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay(); // Sunday=0
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toISOString().slice(0, 10);
}

function groupByCategory(entries) {
  return entries.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
}

function groupByDate(entries, viewMode) {
  return entries.reduce((acc, e) => {
    const key = viewMode === 'weekly' ? weekStartDate(e.date) : e.date;
    acc[key] = (acc[key] || 0) + e.amount;
    return acc;
  }, {});
}

export default function DashboardPage() {
  const [entries] = useLocalStorage('entries', []);
  const [viewMode, setViewMode] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const totalAll = entries.reduce((s, e) => s + e.amount, 0);
  const monthlyEntries = entries.filter(
    e => new Date(e.date).getMonth() + 1 === selectedMonth
  );
  const totalMonth = monthlyEntries.reduce((s, e) => s + e.amount, 0);

  const relevant = viewMode === 'monthly' ? monthlyEntries : entries;
  const grouped = groupByDate(relevant, viewMode);

  const sorted = Object.keys(grouped).sort();
  const lineData = {
    labels: sorted,
    datasets: [{
      label: 'Spending',
      data: sorted.map(d => grouped[d]),
      fill: false,
      borderColor: '#2a9d8f',
      tension: 0.2
    }]
  };

  const catMap = groupByCategory(relevant);
  const pieLabels = Object.keys(catMap);
  const pieData = {
    labels: pieLabels,
    datasets: [{
      data: pieLabels.map(c => catMap[c]),
      backgroundColor: pieLabels.map((_, i) => `hsl(${i * 60}, 70%, 60%)`)
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', align: 'center' },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: $${ctx.formattedValue}`
        }
      }
    }
  };

  return (
    <div className="p-6" style={{ backgroundColor: '#DCF3FC', color: 'black', paddingLeft: '3rem', paddingRight: '3rem' }}>
      <h1 className="font-bold mb-6 text-gray-800">📊 Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="text-gray-500 text-sm uppercase">Total All Time</div>
          <div className="text-3xl font-bold text-emerald-600 mt-2">${totalAll.toFixed(2)}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="text-gray-500 text-sm uppercase">Total This Month</div>
          <div className="text-3xl font-bold text-emerald-600 mt-2">${totalMonth.toFixed(2)}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-700">View Mode:</label>
          <select
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={viewMode}
            onChange={e => setViewMode(e.target.value)}
          >
            <option value="daily">📅 Daily</option>
            <option value="weekly">📊 Weekly</option>
            <option value="monthly">📈 Monthly</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-700">Month:</label>
          <input
            type="number"
            min="1"
            max="12"
            value={selectedMonth}
            onChange={e => setSelectedMonth(Number(e.target.value))}
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 w-24 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg" style={{ height: '20rem'}}>
          <LineChart data={lineData} options={commonOptions} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg" style={{ height: '20rem'}}>
          <PieChart data={pieData} options={commonOptions} />
        </div>
      </div>

      {/* Recent Entries */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          📋 Recent Entries
        </h3>
        <ul className="text-sm divide-y divide-gray-100">
          {monthlyEntries.map((e, i) => (
            <li key={i} className="py-3 flex justify-between items-center">
              <span className="text-gray-700">{e.date} – <span className="text-blue-600">{e.category}</span></span>
              <span className="font-bold text-emerald-600">${e.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
