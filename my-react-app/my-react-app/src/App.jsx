import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Journal from './pages/Journal';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnalyticsDashboard />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Router>
  );
}

export default App;