
import React, { useState, useEffect } from 'react';

const Todohead = ({ currentDate, onDateChange }) => {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const formatDateForInput = (date) => {
    const offset = date.getTimezoneOffset();
    const newDate = new Date(date.getTime() - (offset*60*1000));
    return newDate.toISOString().split('T')[0];
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    onDateChange(selectedDate);
  };

  return (
    <div className="p-4 text-black w-screen flex flex-col items-center">
      <img src={`${process.env.PUBLIC_URL}/fmbc.png`} alt="Logo" className="w-16 h-16 mb-4" />
      <h1 className="text-2xl">ToDo List</h1>
      <input 
        type="date"
        value={formatDateForInput(currentDate)}
        onChange={handleDateChange}
        className="mt-2 p-2 border rounded"
      />
      <blockquote className="mt-2 italic text-center">"{quote}"</blockquote>
    </div>
  );
};

export default Todohead;