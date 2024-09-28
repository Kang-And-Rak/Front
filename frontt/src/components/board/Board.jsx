
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, isTokenExpired, refreshToken, removeToken } from '../../utils/authUtils';
import BoardEdit from './BoardEdit';
import BoardList from './BoardList';
import BoardWrite from './BoardWrite';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(async (config) => {
      const token = getToken();
      if (token && isTokenExpired(token)) {
        try {
          const newToken = await refreshToken();
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          removeToken();
          navigate('/login');
          return Promise.reject(error);
        }
      } else if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    fetchPosts();
    fetchCurrentUser();

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/board');
      setPosts(response.data);
    } catch (error) {
      console.error('게시글 목록을 불러오는데 실패했습니다:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/user');
      setCurrentUser(response.data);
    } catch (error) {
      console.error('사용자 정보를 불러오는데 실패했습니다:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleSubmit = async (title, content) => {
    try {
      await axios.post('http://localhost:3010/api/board', { title, content });
      setIsWriting(false);
      fetchPosts();
    } catch (error) {
      console.error('게시글 작성에 실패했습니다:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleEdit = async (id, title, content) => {
    try {
      await axios.put(`http://localhost:3010/api/board/${id}`, { title, content });
      setIsEditing(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error('게시글 수정에 실패했습니다:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:3010/api/board/${id}`);
        fetchPosts();
      } catch (error) {
        console.error('게시글 삭제에 실패했습니다:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    }
  };

  const startEditing = (post) => {
    setEditingPost(post);
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
          post={editingPost}
          onSubmit={handleEdit}
          onCancel={() => {
            setIsEditing(false);
            setEditingPost(null);
          }}
        />
      ) : (
        <BoardList 
          posts={posts}
          currentUser={currentUser}
          onWriteClick={() => setIsWriting(true)}
          onEditClick={startEditing}
          onDeleteClick={handleDelete}
        />
      )}
    </div>
  );
};

export default Board;