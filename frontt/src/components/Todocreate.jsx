// src/components/Todocreate.jsx
import React, { useState } from 'react';

const Todocreate = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState(''); // 새로운 할 일의 텍스트를 저장할 상태

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼의 기본 동작을 막음
    if (newTodo.trim()) {
      addTodo(newTodo); // 새로운 할 일을 추가하는 함수 호출
      setNewTodo(''); // 입력 필드 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      {/* 새로운 할 일의 텍스트를 입력하는 필드 */}
      <input
        type="text"
        className="border p-2 flex-grow "
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      {/* 추가 버튼 */}
      <button type="submit" className="bg-gray-800 text-white p-2 ml-2">
        Add
      </button>
    </form>
  );
};

export default Todocreate;
