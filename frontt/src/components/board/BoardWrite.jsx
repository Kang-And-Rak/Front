// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const BoardWrite = ({ onSubmit, onCancel }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{'align': []}, {'color': []}, {'background': []}],
//       ['clean']
//     ],
//   };

//   const handleSubmit = () => {
//     onSubmit(title, content);
//     setTitle('');
//     setContent('');
//   };

//   return (
//     <div>
//       <div className="flex items-center mt-5">
//         <img src={`${process.env.PUBLIC_URL}/fmbc.png`} alt="Logo" className="w-10 h-10 mb-3 mr-2" />
//         <h2 className="text-2xl font-bold mb-4">일기 작성</h2>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           placeholder="제목을 입력하세요"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
//         <ReactQuill
//           id="content"
//           value={content}
//           onChange={setContent}
//           modules={modules}
//           className="h-64 mb-4"
//           placeholder='내용을 입력해주세요.'
//         />
//       </div>
//       <div className="flex justify-end space-x-2">
//         <button
//           onClick={onCancel}
//           className="mt-8 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           취소
//         </button>
//         <button
//           onClick={handleSubmit}
//           className="mt-8 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           작성 완료
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BoardWrite;

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BoardWrite = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'align': []}, {'color': []}, {'background': []}],
      ['clean']
    ],
  };

  const handleSubmit = () => {
    onSubmit(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <div className="flex items-center mt-5">
        <img src={`${process.env.PUBLIC_URL}/fmbc.png`} alt="Logo" className="w-10 h-10 mb-3 mr-2" />
        <h2 className="text-2xl font-bold mb-4">일기 작성</h2>
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
        <ReactQuill
          id="content"
          value={content}
          onChange={setContent}
          modules={modules}
          className="h-64 mb-4"
          placeholder='내용을 입력해주세요.'
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="mt-8 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="mt-8 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;