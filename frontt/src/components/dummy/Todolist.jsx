// import React, { useState, useEffect } from 'react';
// import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
// import { dbService } from '../firebase/fbInstance';
// import Todohead from './Todohead';
// import Todocreate from './Todocreate';
// import Todoitem from './Todoitem';

// const Todolist = ({ userObj }) => {
//   const [todos, setTodos] = useState([]);
//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     if (!userObj) return;

//     const q = query(
//       collection(dbService, "todos"),
//       where("userId", "==", userObj.uid),
//       where("date", "==", currentDate.toISOString().split('T')[0])
//     );

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const fetchedTodos = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setTodos(fetchedTodos);
//     });

//     return () => unsubscribe();
//   }, [userObj, currentDate]);

//   const addTodo = async (text) => {
//     if (!userObj) return;

//     const newTodo = {
//       text,
//       completed: false,
//       userId: userObj.uid,
//       date: currentDate.toISOString().split('T')[0],
//       createdAt: serverTimestamp()
//     };
//     await addDoc(collection(dbService, "todos"), newTodo);
//   };

//   const toggleTodo = async (id) => {
//     const todoRef = doc(dbService, "todos", id);
//     const todo = todos.find(todo => todo.id === id);
//     await updateDoc(todoRef, { completed: !todo.completed });
//   };

//   const removeTodo = async (id) => {
//     await deleteDoc(doc(dbService, "todos", id));
//   };

//   const updateTodo = async (id, newText) => {
//     const todoRef = doc(dbService, "todos", id);
//     await updateDoc(todoRef, { text: newText });
//   };

//   const changeDate = (amount) => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() + amount);
//     setCurrentDate(newDate);
//   };

//   useEffect(() => {
//     const checkDateChange = () => {
//       const now = new Date();
//       if (now.toDateString() !== currentDate.toDateString()) {
//         setCurrentDate(now);
//       }
//     };

//     const intervalId = setInterval(checkDateChange, 60000); // 1분마다 체크

//     return () => clearInterval(intervalId);
//   }, [currentDate]);

//   if (!userObj) {
//     return <div>로그인이 필요합니다.</div>;
//   }

//   return (
//     <>
//       <Todohead 
//         currentDate={currentDate} 
//         onPrevDay={() => changeDate(-1)}
//         onNextDay={() => changeDate(1)}
//       />
//       <div className="flex flex-col items-center">
//         <div className="w-full max-w-md p-4 bg-gray-100 rounded-lg shadow-md mt-4">
//           <Todocreate addTodo={addTodo} />
//           <ul>
//             {todos.map((todo) => (
//               <Todoitem
//                 key={todo.id}
//                 todo={todo}
//                 toggleTodo={() => toggleTodo(todo.id)}
//                 removeTodo={() => removeTodo(todo.id)}
//                 updateTodo={(newText) => updateTodo(todo.id, newText)}
//               />
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Todolist;


import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { dbService } from '../firebase/fbInstance';
import Todohead from './Todohead';
import Todocreate from './Todocreate';
import Todoitem from './Todoitem';

const Todolist = ({ userObj }) => {
  const [todos, setTodos] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!userObj) return;

    const q = query(
      collection(dbService, "todos"),
      where("userId", "==", userObj.uid),
      where("date", "==", formatDate(currentDate))
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedTodos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
  }, [userObj, currentDate]);

  const formatDate = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  };

  const addTodo = async (text) => {
    if (!userObj) return;

    const newTodo = {
      text,
      completed: false,
      userId: userObj.uid,
      date: formatDate(currentDate),
      createdAt: serverTimestamp()
    };
    await addDoc(collection(dbService, "todos"), newTodo);
  };

  const toggleTodo = async (id) => {
    const todoRef = doc(dbService, "todos", id);
    const todo = todos.find(todo => todo.id === id);
    await updateDoc(todoRef, { completed: !todo.completed });
  };

  const removeTodo = async (id) => {
    await deleteDoc(doc(dbService, "todos", id));
  };

  const updateTodo = async (id, newText) => {
    const todoRef = doc(dbService, "todos", id);
    await updateDoc(todoRef, { text: newText });
  };

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  if (!userObj) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <>
      <Todohead
        currentDate={currentDate}
        onDateChange={handleDateChange}
      />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md p-4 bg-gray-100 rounded-lg shadow-md mt-4">
          <Todocreate addTodo={addTodo} />
          <ul>
            {todos.map((todo) => (
              <Todoitem
                key={todo.id}
                todo={todo}
                toggleTodo={() => toggleTodo(todo.id)}
                removeTodo={() => removeTodo(todo.id)}
                updateTodo={(newText) => updateTodo(todo.id, newText)}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todolist;