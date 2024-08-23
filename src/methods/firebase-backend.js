import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// 後端 Firebase 配置
const firebaseConfigBackend = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY_BACKEND,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN_BACKEND,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID_BACKEND,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET_BACKEND,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID_BACKEND,
  appId: process.env.VUE_APP_FIREBASE_APP_ID_BACKEND,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID_BACKEND,
};

// 確認是否已經初始化過某個 Firebase App
let firebaseAppBackend;
if (!getApps().length) {
  firebaseAppBackend = initializeApp(firebaseConfigBackend, "firebase-backend");
} else {
  firebaseAppBackend = getApps().find((app) => app.name === "firebase-backend");
  if (!firebaseAppBackend) {
    firebaseAppBackend = initializeApp(firebaseConfigBackend, "firebase-backend");
  }
}

// 初始化驗證
const authBack = getAuth(firebaseAppBackend);

// 輸出
export { authBack };
