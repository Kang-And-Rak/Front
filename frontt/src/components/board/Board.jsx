// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, query, where, getDocs, orderBy, limit, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { dbService, authService } from '../../firebase/fbInstance';
// import BoardList from './BoardList';
// import BoardWrite from './BoardWrite';
// import BoardEdit from './BoardEdit';

// const Board = () => {
//   const [diaries, setDiaries] = useState([]);
//   const [isWriting, setIsWriting] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingDiary, setEditingDiary] = useState(null);

//   useEffect(() => {
//     fetchDiaries();
//   }, []);

//   const fetchDiaries = async () => {
//     const user = authService.currentUser;
//     if (!user) return;

//     const q = query(
//       collection(dbService, "diaries"),
//       where("userId", "==", user.uid),
//       orderBy("createdAt", "desc"),
//       limit(10)
//     );

//     const querySnapshot = await getDocs(q);
//     const fetchedDiaries = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     setDiaries(fetchedDiaries);
//   };

//   const handleSubmit = async (title, content) => {
//     const user = authService.currentUser;
//     if (!user) return;

//     await addDoc(collection(dbService, "diaries"), {
//       title,
//       content,
//       userId: user.uid,
//       createdAt: new Date().toISOString()
//     });

//     setIsWriting(false);
//     fetchDiaries();
//   };

//   const handleEdit = async (id, title, content) => {
//     await updateDoc(doc(dbService, "diaries", id), {
//       title,
//       content,
//       updatedAt: new Date().toISOString()
//     });

//     setIsEditing(false);
//     setEditingDiary(null);
//     fetchDiaries();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("정말로 이 일기를 삭제하시겠습니까?")) {
//       await deleteDoc(doc(dbService, "diaries", id));
//       fetchDiaries();
//     }
//   };

//   const startEditing = (diary) => {
//     setEditingDiary(diary);
//     setIsEditing(true);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {isWriting ? (
//         <BoardWrite 
//           onSubmit={handleSubmit}
//           onCancel={() => setIsWriting(false)}
//         />
//       ) : isEditing ? (
//         <BoardEdit 
//           diary={editingDiary}
//           onSubmit={handleEdit}
//           onCancel={() => {
//             setIsEditing(false);
//             setEditingDiary(null);
//           }}
//         />
//       ) : (
//         <BoardList 
//           diaries={diaries}
//           onWriteClick={() => setIsWriting(true)}
//           onEditClick={startEditing}
//           onDeleteClick={handleDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default Board;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BoardEdit from './BoardEdit';
import BoardList from './BoardList';
import BoardWrite from './BoardWrite';

const Board = () => {
  const [diaries, setDiaries] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDiary, setEditingDiary] = useState(null);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const response = await axios.get('http://your-backend-url/api/diaries', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDiaries(response.data);
    } catch (error) {
      console.error('일기 목록을 불러오는데 실패했습니다:', error);
    }
  };

  const handleSubmit = async (title, content) => {
    try {
      await axios.post('http://your-backend-url/api/diaries', { title, content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsWriting(false);
      fetchDiaries();
    } catch (error) {
      console.error('일기 작성에 실패했습니다:', error);
    }
  };

  const handleEdit = async (id, title, content) => {
    try {
      await axios.put(`http://your-backend-url/api/diaries/${id}`, { title, content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsEditing(false);
      setEditingDiary(null);
      fetchDiaries();
    } catch (error) {
      console.error('일기 수정에 실패했습니다:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말로 이 일기를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:3010/api/diaries/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchDiaries();
      } catch (error) {
        console.error('일기 삭제에 실패했습니다:', error);
      }
    }
  };

  const startEditing = (diary) => {
    setEditingDiary(diary);
    setIsEditing(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {isWriting ? (
        <BoardWrite 
          onSubmit={handleSubmit}
          onCancel={() => setIsWriting(false)}
        />
      ) : isEditing ? (
        <BoardEdit 
          diary={editingDiary}
          onSubmit={handleEdit}
          onCancel={() => {
            setIsEditing(false);
            setEditingDiary(null);
          }}
        />
      ) : (
        <BoardList 
          diaries={diaries}
          onWriteClick={() => setIsWriting(true)}
          onEditClick={startEditing}
          onDeleteClick={handleDelete}
        />
      )}
    </div>
  );
};

export default Board;