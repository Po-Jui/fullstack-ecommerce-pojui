import { initializeApp } from "firebase/app"; // 啟用firebase主程式
// 想要啟用的功能
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"; // 驗證功能
import { getFirestore } from "firebase/firestore";

// firebaseConfig 啟用firebase所需的資料
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

// 啟用firebase主程式
const firebaseApp = initializeApp(firebaseConfig);
// 啟用驗證功能
const auth = getAuth(firebaseApp);
// 啟用資料庫
const db = getFirestore(firebaseApp);
// Google驗證
const googleprovider = new GoogleAuthProvider();
// Facebook驗證
const facebookProvider = new FacebookAuthProvider();
// 輸出
export { firebaseApp, auth, db, googleprovider, facebookProvider };
