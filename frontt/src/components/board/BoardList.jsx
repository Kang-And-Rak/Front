// import React, { useState } from 'react';

// const BoardList = ({ diaries, onWriteClick, onEditClick, onDeleteClick }) => {
//   const [expandedDiary, setExpandedDiary] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const toggleDiaryExpansion = (diaryId) => {
//     if (expandedDiary === diaryId) {
//       setExpandedDiary(null);
//     } else {
//       setExpandedDiary(diaryId);
//     }
//   };

//   // 현재 페이지의 일기 목록 계산
//   const indexOfLastDiary = currentPage * itemsPerPage;
//   const indexOfFirstDiary = indexOfLastDiary - itemsPerPage;
//   const currentDiaries = diaries.slice(indexOfFirstDiary, indexOfLastDiary);

//   // 총 페이지 수 계산
//   const totalPages = Math.ceil(diaries.length / itemsPerPage);

//   // 페이지 변경 함수
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="flex flex-col items-center">
//       <img src={`${process.env.PUBLIC_URL}/fmbc.png`} alt="Logo" className="w-16 h-16 mb-3" />
//       <div className="w-full mt-5 mb-8 bg-gray-100 p-4 rounded-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">DIARY</h2>
//           <button
//             onClick={onWriteClick}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             글쓰기
//           </button>
//         </div>
//         {currentDiaries.map((diary) => (
//           <div key={diary.id} className="bg-white p-3 rounded-lg mb-2 shadow">
//             <div className="flex justify-between items-center">
//               <h3 
//                 className="font-semibold cursor-pointer"
//                 onClick={() => toggleDiaryExpansion(diary.id)}
//               >
//                 {diary.title} ({new Date(diary.createdAt).toLocaleDateString()})
//               </h3>
//               <div className="text-sm text-gray-500">
//                 <span className="cursor-pointer mr-2" onClick={() => onEditClick(diary)}>edit</span>
//                 <span className="cursor-pointer" onClick={() => onDeleteClick(diary.id)}>remove</span>
//               </div>
//             </div>
//             {expandedDiary === diary.id && (
//               <div className="mt-2 text-gray-600">
//                 <div dangerouslySetInnerHTML={{ __html: diary.content }} />
//               </div>
//             )}
//           </div>
//         ))}
      
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//             <button
//               key={number}
//               onClick={() => paginate(number)}
//               className={`mx-1 px-3 py-1 border rounded ${
//                 currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'
//               }`}
//             >
//               {number}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardList;

import React, { useState } from 'react';

const BoardList = ({ diaries, onWriteClick, onEditClick, onDeleteClick }) => {
  const [expandedDiary, setExpandedDiary] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleDiaryExpansion = (diaryId) => {
    if (expandedDiary === diaryId) {
      setExpandedDiary(null);
    } else {
      setExpandedDiary(diaryId);
    }
  };

  // 현재 페이지의 일기 목록 계산
  const indexOfLastDiary = currentPage * itemsPerPage;
  const indexOfFirstDiary = indexOfLastDiary - itemsPerPage;
  const currentDiaries = diaries.slice(indexOfFirstDiary, indexOfLastDiary);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(diaries.length / itemsPerPage);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center">
      <img src={`${process.env.PUBLIC_URL}/fmbc.png`} alt="Logo" className="w-16 h-16 mb-3" />
      <div className="w-full mt-5 mb-8 bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">DIARY</h2>
          <button
            onClick={onWriteClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            글쓰기
          </button>
        </div>
        {currentDiaries.map((diary) => (
          <div key={diary.id} className="bg-white p-3 rounded-lg mb-2 shadow">
            <div className="flex justify-between items-center">
              <h3 
                className="font-semibold cursor-pointer"
                onClick={() => toggleDiaryExpansion(diary.id)}
              >
                {diary.title} ({new Date(diary.createdAt).toLocaleDateString()})
              </h3>
              <div className="text-sm text-gray-500">
                <span className="cursor-pointer mr-2" onClick={() => onEditClick(diary)}>edit</span>
                <span className="cursor-pointer" onClick={() => onDeleteClick(diary.id)}>remove</span>
              </div>
            </div>
            {expandedDiary === diary.id && (
              <div className="mt-2 text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: diary.content }} />
              </div>
            )}
          </div>
        ))}
      
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardList;