
import React, { useState } from 'react';

const BoardList = ({ posts, currentUser, onWriteClick, onEditClick, onDeleteClick }) => {
  const [expandedPost, setExpandedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const togglePostExpansion = (postId) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
    }
  };

  // 현재 페이지의 게시글 목록 계산
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center">
      <img src={`${process.env.PUBLIC_URL}/fmbc.png`} alt="Logo" className="w-16 h-16 mb-3" />
      <div className="w-full mt-5 mb-8 bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">게시판</h2>
          <button
            onClick={onWriteClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            글쓰기
          </button>
        </div>
        {currentPosts.map((post) => (
          <div key={post.id} className="bg-white p-3 rounded-lg mb-2 shadow">
            <div className="flex justify-between items-center">
              <h3 
                className="font-semibold cursor-pointer"
                onClick={() => togglePostExpansion(post.id)}
              >
                {post.title} ({new Date(post.createdAt).toLocaleDateString()})
              </h3>
              <div className="text-sm text-gray-500">
                {currentUser && currentUser.id === post.authorId && (
                  <>
                    <span className="cursor-pointer mr-2" onClick={() => onEditClick(post)}>edit</span>
                    <span className="cursor-pointer" onClick={() => onDeleteClick(post.id)}>remove</span>
                  </>
                )}
              </div>
            </div>
            {expandedPost === post.id && (
              <div className="mt-2 text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <p className="text-sm text-gray-500 mt-2">작성자: {post.authorName}</p>
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