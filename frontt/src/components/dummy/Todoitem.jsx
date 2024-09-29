import React, { useState } from 'react';

const Todoitem = ({ todo, toggleTodo, removeTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태를 저장
  const [newText, setNewText] = useState(todo.text); // 수정할 할 일 텍스트를 저장

  // 수정 모드로 전환하는 함수
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 수정된 내용을 저장하고 수정 모드를 종료하는 함수
  const handleSave = () => {
    updateTodo(newText); // 부모 컴포넌트에 수정된 텍스트를 전달
    setIsEditing(false);
  };

  // 수정 모드를 취소하고 원래 텍스트로 되돌리는 함수
  const handleCancel = () => {
    setNewText(todo.text); // 수정 전 텍스트로 되돌림
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between mb-2 p-2 bg-white shadow rounded">
      {isEditing ? (
        // 수정 모드일 때
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border p-2 flex-grow mr-2"
          />
          <button className="bg-green-500 text-white p-2 mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="bg-gray-500 text-white p-2" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        // 일반 모드일 때
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleTodo}
            className="mr-2"
          />
          <span
            className={`flex-grow ${todo.completed ? 'line-through' : ''}`}
            onClick={toggleTodo}
          >
            {todo.text}
          </span>
          <button className="bg-blue-500 text-white p-2 mr-2" onClick={handleEdit}>
            Edit
          </button>
          <button className="bg-red-700 text-white p-2" onClick={removeTodo}>
            Remove
          </button>
        </>
      )}
    </li>
  );
};

export default Todoitem;
