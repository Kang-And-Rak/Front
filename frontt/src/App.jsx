import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Board from './components/board/Board';
import Nav from './components/Nav';
import './index.css';
import { getToken, isTokenExpired, removeToken } from './utils/authUtils';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        if (isTokenExpired(token)) {
          removeToken();
          setIsLoggedIn(false);
          setUserObj(null);
          setInit(true);
          return;
        }
        try {
          const response = await axios.get('http://localhost:3010/api/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setIsLoggedIn(true);
          setUserObj(response.data);
        } catch (error) {
          removeToken();
          setIsLoggedIn(false);
          setUserObj(null);
        }
      }
      setInit(true);
    };

    initializeAuth();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  if (!init) {
    return <div>초기화 중...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="content mt-[60px]">
          <Routes>
            <Route path="/login" element={
              !isLoggedIn ? <Auth setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />
            } />
            <Route path="/signup" element={
              !isLoggedIn ? <Auth setIsLoggedIn={setIsLoggedIn} newAccount={true} /> : <Navigate to="/" />
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <Board userObj={userObj} />
              </ProtectedRoute>
            } />
            {/* <Route path="/todolist" element={
              <ProtectedRoute>
                <Todolist userObj={userObj} />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Calendar userObj={userObj} />
              </ProtectedRoute>
            } /> */}
            <Route path="/board" element={
              <ProtectedRoute>
                <Board userObj={userObj} />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;