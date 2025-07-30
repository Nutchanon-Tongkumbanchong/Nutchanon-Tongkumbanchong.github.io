import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import JournalPage from './JournalPage';
import './index.css';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-blue-50">
        {/* Header */}
        <header
          className="shadow-lg"
          style={{ backgroundColor: '#789CCE' }}
        >
          <div className="px-6 py-4">
            <h1 className="font-bold text-center text-gray-800 mb-6">Finance Tracker</h1>
            <nav className="flex justify-center" style={{ gap: '3rem' }}>
              <Link 
                to="/" 
                className="px-8 py-4 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#93c5fd' }}
              >
                📊 Dashboard
              </Link>
              <Link 
                to="/journal" 
                className="px-8 py-4 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#93c5fd' }}
              >
                📝 Journal
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/journal" element={<JournalPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
