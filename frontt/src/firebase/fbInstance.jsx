// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDOqK9oYzV5crAmz__hqoSanOmkvHeey1g",
//   authDomain: "raktodo21.firebaseapp.com",
//   projectId: "raktodo21",
//   storageBucket: "raktodo21.appspot.com",
//   messagingSenderId: "740032521472",
//   appId: "1:740032521472:web:8c84fbbf554e89beea3fe5",
//   measurementId: "G-7CT7XTW04L"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const authService = getAuth();
// export default app;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDOqK9oYzV5crAmz__hqoSanOmkvHeey1g",
    authDomain: "raktodo21.firebaseapp.com",
    projectId: "raktodo21",
    storageBucket: "raktodo21.appspot.com",
    messagingSenderId: "740032521472",
    appId: "1:740032521472:web:8c84fbbf554e89beea3fe5",
    measurementId: "G-7CT7XTW04L"
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);

export default app;