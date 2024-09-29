import React, { useRef, useEffect } from 'react';

const TodoModal = ({ isOpen, onClose, date, todos }) => {
  const modalRef = useRef();
  
  useEffect(() => {
    console.log("Modal opened with date:", date);
    console.log("Todos for this date:", todos);
  }, [date, todos]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !date) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white p-4 rounded-lg max-w-md w-full">
        <h2 className="text-xl mb-4 font-bold">{date.toLocaleDateString()}의 할 일</h2>
        {todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="mr-2"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.text}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>이 날짜에는 할 일이 없습니다.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default TodoModal;