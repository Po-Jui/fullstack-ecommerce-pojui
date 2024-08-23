import axios from "axios";

// 創建 axios 實例
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 請求攔截器
instance.interceptors.request.use(
  (config) => {
    // 如果你在 localStorage 中存儲了 token，可以在這裡添加
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 響應攔截器
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "操作失敗，請稍後再試";

    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = "請求錯誤";
          break;
        case 401:
          errorMessage = "未授權，請重新登錄";
          break;
        case 403:
          errorMessage = "拒絕訪問";
          break;
        case 404:
          errorMessage = "請求的資源不存在";
          break;
        case 500:
          errorMessage = "服務器內部錯誤";
          break;
        default:
          errorMessage = `請求失敗 (${error.response.status})`;
      }
    } else if (error.request) {
      errorMessage = "無法連接到服務器";
    }

    console.error("API 錯誤:", errorMessage);
    // 如果使用了全局的通知系統，可以在這裡觸發
    // 例如：Vue.prototype.$notify({ type: 'error', message: errorMessage });

    return Promise.reject(new Error(errorMessage));
  }
);

export default instance;
