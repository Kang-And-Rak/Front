import { getDaysInMonth } from 'date-fns';
import React from 'react';

const CALENDAR_LENGTH = 35;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;
const DAY_LIST = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarBody = ({ currentDate, onDateClick, todos }) => {
  const totalMonthDays = getDaysInMonth(currentDate);
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevDayList = Array.from({ length: startDay }).map(() => DEFAULT_TRASH_VALUE);
  const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => i + 1);
  const nextDayList = Array.from({
    length: CALENDAR_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);

  const weekCalendarList = currentCalendarList.reduce((acc, cur, idx) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);
    return acc;
  }, []);

  const hasTodos = (day) => {
    if (day === DEFAULT_TRASH_VALUE) return false;
    
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    return todos.some(todo => todo.date === dateString);
  };
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            {DAY_LIST.map((day) => (
              <th key={day} className="px-2 py-2 border">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekCalendarList.map((week, index) => (
            <tr key={index} className="h-[70px]">
              {week.map((day, idx) => (
                <td
                  key={idx}
                  className="border p-2 align-top cursor-pointer relative"
                  onClick={() => {
                    if (day !== DEFAULT_TRASH_VALUE) {
                      const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                      onDateClick(clickedDate);
                    }
                  }}
                >
                  {day === DEFAULT_TRASH_VALUE ? '' : day}
                  {hasTodos(day) && (
                    <img
                      src={`${process.env.PUBLIC_URL}/fmbc.png`}
                      alt="Todo"
                      className="w-4 h-4 absolute bottom-1 right-1"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarBody;