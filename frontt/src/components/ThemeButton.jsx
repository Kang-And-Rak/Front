// import React, { useState, useEffect } from 'react';

// const ThemeButton = () => {
//     // isDarkMode 상태는 다크 모드가 활성화되어 있는지를 나타냄
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     // 컴포넌트가 처음 마운트될 때 실행되는 useEffect
//     useEffect(() => {
//         const htmlEl = document.querySelector('html');
//         // html 태그에 'dark' 클래스가 있으면 다크 모드로 설정
//         if (htmlEl.classList.contains('dark')) {
//             setIsDarkMode(true);
//         }
//     }, []);

//     // 다크 모드를 토글하는 함수
//     const toggleTheme = () => {
//         const htmlEl = document.querySelector('html');
//         if (!htmlEl) return;

//         const enabledDarkMode = htmlEl.classList.contains('dark');
//         if (enabledDarkMode) {
//             // 다크 모드가 활성화된 경우 'dark' 클래스를 제거
//             htmlEl.classList.remove('dark');
//             setIsDarkMode(false);
//         } else {
//             // 다크 모드가 비활성화된 경우 'dark' 클래스를 추가
//             htmlEl.classList.add('dark');
//             setIsDarkMode(true);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center mt-4">
//             {/* 스위치 버튼과 라벨을 감싸는 레이블 */}
//             <label className="relative inline-flex items-center cursor-pointer">
//                 {/* 숨겨진 체크박스, 실제 토글은 이 체크박스를 통해 이루어짐 */}
//                 <input
//                     type="checkbox"
//                     checked={isDarkMode}
//                     onChange={toggleTheme}
//                     className="sr-only"
//                 />
//                 {/* 스위치 버튼 */}
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 {/* 스위치 버튼 옆에 라벨 */}
//                 <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
//                     {isDarkMode ? 'Dark Mode' : 'Light Mode'}
//                 </span>
//             </label>
//         </div>
//     );
// };

// export default ThemeButton;
