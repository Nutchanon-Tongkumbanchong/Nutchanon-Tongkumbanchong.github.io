import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import spendingData from './spending_data.json';
import { v4 as uuid } from 'uuid';

export default function JournalPage() {
  const [entries, setEntries] = useLocalStorage('entries', []);
  const [categories, setCategories] = useLocalStorage(
    'categories',
    spendingData.map(item => item.category)
  );

  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [newCategoryText, setNewCategoryText] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const finalCategory = category === '__new'
      ? newCategoryText.trim()
      : category;

    if (!finalCategory) return;

    const newEntry = {
      id: uuid(),
      date,
      category: finalCategory,
      amount: parseFloat(amount),
    };
    setEntries(prev => [...prev, newEntry]);

    if (!categories.includes(finalCategory)) {
      setCategories(prev => [...prev, finalCategory]);
    }

    setDate('');
    setCategory('');
    setNewCategoryText('');
    setAmount('');
  };

  return (
    <div className="p-6" style={{ backgroundColor: '#DCF3FC', color: 'black', paddingLeft: '3rem', paddingRight: '3rem' }}>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📝 Journal Entry</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📅 Date:
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              className="w-1/4 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ backgroundColor: '#93c5fd' }}
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🏷️ Category:
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              className="w-1/4 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ backgroundColor: '#93c5fd' }}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="__new">➕ Add new category</option>
            </select>
          </div>

          {category === '__new' && (
            <div className="flex flex-col items-center">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ✨ New Category Name:
              </label>
              <input
                type="text"
                value={newCategoryText}
                onChange={e => setNewCategoryText(e.target.value)}
                placeholder="Enter new category name"
                required
                className="w-1/4 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ backgroundColor: '#93c5fd' }}
              />
            </div>
          )}

          <div className="flex flex-col items-center">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              💰 Amount:
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-1/4 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ backgroundColor: '#93c5fd' }}
            />
          </div>

          <div className="flex justify-center">
            <button 
              type="submit"
              className="px-8 py-4 text-white font-bold rounded-xl shadow-lg"
              style={{
                backgroundColor: '#d0e7a3',
                color: '#333'
              }}
            >
              ✅ Add Entry
            </button>
          </div>
        </form>
      </div>

      {entries.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            📋 Existing Entries
          </h3>
          <ul className="space-y-2">
            {entries.map(entry => (
              <li 
                key={entry.id} 
                className="py-3 px-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center"
              >
                <span className="text-gray-700">
                  📅 {entry.date} — <span className="text-blue-600">{entry.category}</span>
                </span>
                <span className="font-bold text-emerald-600 text-lg">
                  ${entry.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
