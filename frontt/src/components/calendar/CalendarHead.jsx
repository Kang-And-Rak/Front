import { subMonths, format } from 'date-fns';
import React from 'react';

const CalendarHead = ({ currentDate, setCurrentDate }) => {
    return (
      <div className="w-full flex justify-between items-center mb-4"> 
        <button
          onClick={() => {
            setCurrentDate(subMonths(currentDate, 1)); // 이전 달로 이동
          }}
          className="bg-gray-300 p-2 rounded"
        >
          Prev
        </button>
        
        <h2 className="text-xl font-bold mt-10">
          {format(currentDate, 'yyyy년 MM월')}
        </h2>
        <button
          onClick={() => {
            setCurrentDate(subMonths(currentDate, -1)); // 다음 달로 이동
          }}
          className="bg-gray-300 p-2 rounded"
        >
          Next
        </button>
      </div>
    );
  };
  export default CalendarHead;