import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeAccessToken, getAccessToken, isAccessTokenExpired, removeAccessToken } from '../../utils/authUtils';
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

  const fetchPosts = useCallback(async () => {
    try {
      const accessToken = getAccessToken();
      const response = await axios.get('http://localhost:3010/post', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('게시글 목록을 불러오는데 실패했습니다:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken && !isAccessTokenExpired(accessToken)) {
      const decodedToken = decodeAccessToken(accessToken);
      setCurrentUser(decodedToken);
    } else {
      navigate('/login');
    }

    const interceptor = axios.interceptors.request.use((config) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        if (isAccessTokenExpired(accessToken)) {
          removeAccessToken();
          navigate('/login');
          return Promise.reject('Access token expired');
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    fetchPosts();

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [navigate, fetchPosts]);

  const handleSubmit = async (title, content) => {
    try {
      const accessToken = getAccessToken();
      await axios.post('http://localhost:3010/post', 
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
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
      const accessToken = getAccessToken();
      await axios.put(`http://localhost:3010/post/${id}`, 
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
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
        const accessToken = getAccessToken();
        await axios.delete(`http://localhost:3010/post/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
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