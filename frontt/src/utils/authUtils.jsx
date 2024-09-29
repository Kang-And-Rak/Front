// // src/utils/authUtils.js

// // 토큰을 로컬 스토리지에 저장
// export const setToken = (token) => {
//     localStorage.setItem('token', token);
//   };
  
//   // 로컬 스토리지에서 토큰 가져오기
//   export const getToken = () => {
//     return localStorage.getItem('token');
//   };
  
//   // 로컬 스토리지에서 토큰 제거
//   export const removeToken = () => {
//     localStorage.removeItem('token');
//   };
  
//   // 토큰 만료 여부 확인
//   export const isTokenExpired = (token) => {
//     if (!token) {
//       return true;
//     }
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.exp < Date.now() / 1000;
//     } catch (error) {
//       return true;
//     }
//   };
  
//   // 토큰 만료 처리
//   export const handleTokenExpiration = () => {
//     if (isTokenExpired(getToken())) {
//       removeToken();
//       // 여기서 필요하다면 추가적인 로그아웃 로직을 구현할 수 있습니다.
//       // 예: 리액트 라우터를 사용한다면 로그인 페이지로 리다이렉트
//       window.location.href = '/login';
//     }
//   };

// src/utils/authUtils.js

// accessToken을 로컬 스토리지에 저장
export const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
  };
  
  // 로컬 스토리지에서 accessToken 가져오기
  export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  // 로컬 스토리지에서 accessToken 제거
  export const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
  };
  
  // accessToken 만료 여부 확인
  export const isAccessTokenExpired = (token) => {
    if (!token) {
      return true;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  };
  
  // accessToken 디코딩
  export const decodeAccessToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('토큰 디코딩 실패:', error);
      return null;
    }
  };
  
  // accessToken 만료 처리
  export const handleAccessTokenExpiration = () => {
    if (isAccessTokenExpired(getAccessToken())) {
      removeAccessToken();
      window.location.href = '/login';
    }
  };