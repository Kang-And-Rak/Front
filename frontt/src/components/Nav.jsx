import axios from 'axios';
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 백엔드에 로그아웃 요청 보내기
      await axios.post('http://localhost:3010/logout', {}, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // 로컬 저장소에서 JWT 토큰 삭제
      localStorage.removeItem('token');
      
      // 로그아웃 상태 업데이트
      setIsLoggedIn(false);
      
      // 로그인 페이지로 리다이렉트
      navigate('/login');
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-400 to-green-400 p-4 fixed w-full top-0 z-10 m-0">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-white text-3xl font-bold font-permanent-marker">
            RAK
          </Link>
          {/* <Link to="/todolist" className="text-white text-xl font-bold">
            투두리스트
          </Link>
          <Link to="/calendar" className="text-white text-xl font-bold">
            캘린더
          </Link> */}
          <Link to="/" className="text-white text-xl font-bold">
            게시판
          </Link>
        </div>
        <div className="flex items-center space-x-8">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-white text-xl font-bold">
              로그아웃
            </button>
          ) : (
            <>
              <Link to="/signup" className="text-white text-xl font-bold">
                회원가입
              </Link>
              <Link to="/login" className="text-white text-xl font-bold">
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;