import React, { useState } from 'react';
import JournalForm from '../components/JournalForm';

function Journal() {
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords([...records, record]);
  };

  return (
    <div>
      <h1>Spending Journal</h1>
      <JournalForm onAddRecord={addRecord} />
      <h2>Entered Records</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            {record.date} - {record.category}: ${record.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Journal;