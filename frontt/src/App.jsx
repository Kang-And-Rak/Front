// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { authService } from './firebase/fbInstance';
// import './index.css';
// import Todolist from './components/Todolist';
// import Calendar from './components/calendar/Calendar';

// import Board from './components/board/Board';

// import Nav from './components/Nav';
// import Auth from './firebase/Auth';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userObj, setUserObj] = useState(null);
//   const [init, setInit] = useState(false);

//   useEffect(() => {
//     onAuthStateChanged(authService, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//         setUserObj(user);
//       } else {
//         setIsLoggedIn(false);
//         setUserObj(null);
//       }
//       setInit(true);
//     });
//   }, []);

//   const ProtectedRoute = ({ children }) => {
//     if (!isLoggedIn) {
//       return <Navigate to="/login" />;
//     }
//     return children;
//   };

//   if (!init) {
//     return <div>초기화 중...</div>;
//   }

//   return (
//     <Router>
//       <div className="App">
//         <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//         <div className="content mt-[60px]">
//           <Routes>
//             <Route path="/login" element={
//               !isLoggedIn ? <Auth setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />
//             } />
//             <Route path="/signup" element={
//               !isLoggedIn ? <Auth setIsLoggedIn={setIsLoggedIn} newAccount={true} /> : <Navigate to="/" />
//             } />
//             <Route path="/" element={
//               <ProtectedRoute>
//                 <Todolist userObj={userObj} />
//               </ProtectedRoute>
//             } />
//             <Route path="/todolist" element={
//               <ProtectedRoute>
//                 <Todolist userObj={userObj} />
//               </ProtectedRoute>
//             } />
//             <Route path="/calendar" element={
//               <ProtectedRoute>
//                 <Calendar userObj={userObj} />
//               </ProtectedRoute>
//             } />
//             <Route path="/board" element={
//               <ProtectedRoute>
//                 <Board userObj={userObj} />
//               </ProtectedRoute>
//             } />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Board from './components/board/Board';
import Calendar from './components/calendar/Calendar';
import Nav from './components/Nav';
import Todolist from './components/Todolist';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3010/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setIsLoggedIn(true);
        setUserObj(response.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => {
        setInit(true);
      });
    } else {
      setInit(true);
    }
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
                <Todolist userObj={userObj} />
              </ProtectedRoute>
            } />
            <Route path="/todolist" element={
              <ProtectedRoute>
                <Todolist userObj={userObj} />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Calendar userObj={userObj} />
              </ProtectedRoute>
            } />
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