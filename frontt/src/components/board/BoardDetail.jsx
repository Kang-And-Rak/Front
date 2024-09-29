// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getToken } from '../../utils/authUtils';

// const BoardDetail = ({ userObj }) => {
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [isLiked, setIsLiked] = useState(false);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPost();
//     fetchComments();
//   }, [id]);

//   const fetchPost = async () => {
//     try {
//       const token = getToken();
//       const response = await axios.get(`http://localhost:3010/post/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setPost(response.data);
//       setIsLiked(response.data.isLiked);
//     } catch (error) {
//       console.error('게시글을 불러오는데 실패했습니다:', error);
//       if (error.response && error.response.status === 401) {
//         navigate('/login');
//       }
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const token = getToken();
//       const response = await axios.get(`http://localhost:3010/comment/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setComments(response.data);
//     } catch (error) {
//       console.error('댓글을 불러오는데 실패했습니다:', error);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const token = getToken();
//       await axios.post(`http://localhost:3010/like/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setIsLiked(!isLiked);
//       fetchPost(); // 좋아요 수 업데이트를 위해 게시글 다시 불러오기
//     } catch (error) {
//       console.error('좋아요 처리에 실패했습니다:', error);
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = getToken();
//       await axios.post(`http://localhost:3010/comment`, {
//         postId: id,
//         content: newComment
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setNewComment('');
//       fetchComments();
//     } catch (error) {
//       console.error('댓글 작성에 실패했습니다:', error);
//     }
//   };

//   if (!post) return <div>Loading...</div>;

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-4">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//       <p className="text-gray-600 mb-2">작성자: {post.authorName}</p>
//       <p className="text-gray-600 mb-4">작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
//       <div className="mb-4" dangerouslySetInnerHTML={{ __html: post.content }} />
//       <div className="flex items-center mb-4">
//         <button 
//           onClick={handleLike}
//           className={`mr-2 px-4 py-2 rounded ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
//         >
//           {isLiked ? '좋아요 취소' : '좋아요'}
//         </button>
//         <span>좋아요 {post.likesCount}개</span>
//       </div>
//       <div className="mb-4">
//         <h2 className="text-2xl font-bold mb-2">댓글</h2>
//         {comments.map((comment) => (
//           <div key={comment.id} className="bg-gray-100 p-2 mb-2 rounded">
//             <p>{comment.content}</p>
//             <p className="text-sm text-gray-600">작성자: {comment.authorName}</p>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleCommentSubmit} className="mb-4">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//           placeholder="댓글을 입력하세요"
//           rows="3"
//         />
//         <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">댓글 작성</button>
//       </form>
//     </div>
//   );
// };

// export default BoardDetail;
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccessToken } from '../../utils/authUtils';

const BoardDetail = ({ userObj }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`http://localhost:3010/post/${id}`, {
        headers: { Authorization: `accessToken ${token}` }
      });
      setPost(response.data);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error('게시글을 불러오는데 실패했습니다:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }, [id, navigate]);

  const fetchComments = useCallback(async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`http://localhost:3010/post/${id}/comment`, {
        headers: { Authorization: `accessToken ${token}` }
      });
      setComments(response.data);
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchPost, fetchComments]);

  const handleLike = async () => {
    try {
      const token = getAccessToken();
      if (isLiked) {
        await axios.delete(`http://localhost:3010/post/${id}/like`, {
          headers: { Authorization: `accessToken ${token}` }
        });
      } else {
        await axios.post(`http://localhost:3010/post/${id}/like`, {}, {
          headers: { Authorization: `accessToken ${token}` }
        });
      }
      setIsLiked(!isLiked);
      fetchPost();
    } catch (error) {
      console.error('좋아요 처리에 실패했습니다:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAccessToken();
      await axios.post(`http://localhost:3010/post/${id}/comment`, {
        content: newComment
      }, {
        headers: { Authorization: `accessToken ${token}` }
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('댓글 작성에 실패했습니다:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">작성자: {post.authorName}</p>
      <p className="text-gray-600 mb-4">작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="mb-4" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="flex items-center mb-4">
        <button 
          onClick={handleLike}
          className={`mr-2 px-4 py-2 rounded ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          {isLiked ? '좋아요 취소' : '좋아요'}
        </button>
        <span>좋아요 {post.likesCount}개</span>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">댓글</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-2 mb-2 rounded">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-600">작성자: {comment.authorName}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="댓글을 입력하세요"
          rows="3"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">댓글 작성</button>
      </form>
    </div>
  );
};

export default BoardDetail;