<div align="center">
   <a href="https://po-jui.github.io/vue3-ecommerce-pojui/" title="Belle journée" target="_blank">
      <img src="https://imgur.com/GdDwEDG.png" alt="CandleStudio" width="100">
   </a>
   <h1>fullstack-ecommerce-pojui 電商網站</h1>
</div>

vue3-ecommerce-pojui 是一個基於 Vue.js + Firebase 建構而成的電子商務網站，支援 RWD，UI 皆以 SCSS 並遵循 OOCSS 手刻而成，強調樣式的模組化及可重用性，平台使用者主要可分為管理員 (admin)、會員 (member) 兩種身分，管理員可依照主題快速擴展商店，會員可透過前台購物功能進行消費等行為。

## 線上演示

- Demo：https://fullstack-ecommerce-pojui.zeabur.app/
- 備用 Demo 網址：https://po-jui.github.io/fullstack-ecommerce-pojui/

## 設計說明

這個專案使用 Vue 3 結合 Firebase 雲端資料庫，主要目的是練習 API 串接與資料庫操作，同時強化和更新框架的應用知識。API 的部分使用六角學院提供的練習 API 進行串接，而 Firebase 資料庫則負責儲存會員和訂單資訊。專案中採用了 Bootstrap 5 和 Vuetify 3 作為 UI 框架，並且支援響應式網頁設計 (RWD)。

- 管理員後台功能 (商品管理、訂單管理、優惠卷管理) ✔
- 會員前台購物功能 (購物車、結帳付款、歷史訂單、修改個人資料) ✔

## 專案功能

- 使用 Firebase Authentication 管理用戶
- 使用 Firebase Realtime Database 操作資料庫
- 購物車 (CRUD)
- 商品管理 (CRUD)
- 優惠卷管理 (CRUD)
- 訂單管理 (CRUD)
- 註冊會員
- 第三方登入 (Google)
- 發送密碼重製郵件
- 會員收藏商品

## 使用技術

1. 前端

   - Vue.js / Vue Router / Vue CLI 5
   - Webpack
   - JavaScript
   - Axios
   - OOCSS
   - SCSS
   - RWD
   - zeabur Deployment
   - github Deployment

2. 代碼風格

   - Prettier

3. 額外插件

   - vuetify
   - bootstrap
   - aos
   - mitt
   - vue-axios
   - vue-fontawesome
   - vue-awesome-swiper
   - vue-sweetalert2
   - vue3-loading-overlay

4. 其他

   - Responsive Grid System
   - Theme Color

## 應用介面

- 前台購物 - 首頁

![前台購物(首頁)](https://imgur.com/aP7MVk3.png)

- 前台購物 - 首頁 - 最新消息

![前台購物(首頁 - 最新消息)](https://imgur.com/EKKKwDV.png)

- 前台購物 - 首頁 - 商品專區

![前台購物(首頁 - 商品專區)](https://imgur.com/bQRHzBJ.png)
![前台購物(首頁 - 商品專區)](https://imgur.com/6nV3Tle.png)
![前台購物(首頁 - 商品專區)](https://imgur.com/EJd2z61.png)

- 前台購物 - 首頁 - 實際畫面

https://github.com/user-attachments/assets/8970e06b-fb92-4e2d-8353-990dd9969ddf

- 前台購物 - 商品列表 - 全部商品 ( 可選擇分類及排序 )

![前台購物(商品列表 - 全部商品)](https://imgur.com/RijjdWy.png)

- 前台購物 - 商品列表 - 全部商品 - 實際畫面

https://github.com/user-attachments/assets/9f798620-c145-45ac-9f3b-212c51772819

- 前台購物 - 商品列表 - 商品介紹 ( 可選擇數量及相關商品 )

![前台購物(商品列表 - 商品介紹)](https://imgur.com/CZFhnc3.png)

- 前台購物 - 商品列表 - 商品介紹 - 實際畫面

https://github.com/user-attachments/assets/f8c8ec40-cb52-4640-bb71-0b74f1c20afe

- 前台購物 - 關於我們

![前台購物(關於我們)](https://imgur.com/z7MEg7t.png)
![前台購物(關於我們)](https://imgur.com/yAk28Cy.png)

- 前台購物 - 關於我們 - 實際畫面

https://github.com/user-attachments/assets/321cc594-a690-4475-a157-121a0e0a2a91

- 前台購物 - 登入/註冊會員/忘記密碼

![前台購物(登入頁)](https://imgur.com/ilaoNqr.png)

- 前台購物 - 登入/註冊會員/忘記密碼 - 實際畫面

https://github.com/user-attachments/assets/5101033e-648b-439a-b42f-568bbf622f0d

- 前台購物 - 登入(一般) - 實際畫面

https://github.com/user-attachments/assets/43fc7189-9a80-40e9-bff9-b5225a479c53

- 前台購物 - 登入(google) - 實際畫面

https://github.com/user-attachments/assets/5912cc6e-d69a-4a0a-ae28-56d29541ab74

- 會員功能 - 會員中心 - 修改個人資料

![會員功能(會員中心 - 修改個人資料)](https://imgur.com/MMmN1WS.png)

- 會員功能 - 會員中心 - 修改個人資料 - 實際畫面

https://github.com/user-attachments/assets/ede3d022-a8ac-45f1-abc5-18a80442e06c

- 會員功能 - 會員中心 - 歷史訂單查詢

![會員功能(歷史訂單查詢)](https://imgur.com/pKYTRDS.png)

- 會員功能 - 會員中心 - 歷史訂單查詢 - 實際畫面

https://github.com/user-attachments/assets/a522eb68-19a0-4f26-a671-1b5dec0671af

- 會員功能 - 追蹤商品

![會員功能(追蹤商品)](https://imgur.com/2zp15XE.png)

- 會員功能 - 追蹤商品 - 實際畫面

https://github.com/user-attachments/assets/83e69e37-cdd5-40a9-9a69-6c78559d3b76

- 會員功能 - 購物車

![會員功能(購物車)](https://imgur.com/NgCkoTy.png)

- 會員功能 - 購物車 - 實際畫面

https://github.com/user-attachments/assets/491a77d0-95b9-4d63-bf66-1e66e0538dbb

- 會員功能 - 購物清單

![會員功能(購物清單)](https://imgur.com/qP92Dpw.png)

- 會員功能 - 購物清單 ( 套用優惠券 )

![會員功能(購物清單 - 套用優惠券)](https://imgur.com/uWl38mC.png)

- 會員功能 - 購物清單 ( 套用優惠券 ) - 實際畫面

https://github.com/user-attachments/assets/6b0d3bcd-6bc0-4a48-947c-500e40d78226

- 會員功能 - 結帳付款 (模擬付款)

![會員功能(結帳付款)](https://imgur.com/869AIuU.png)

- 會員功能 - 結帳付款 (模擬付款) - 實際畫面

![會員功能(結帳付款)](https://imgur.com/ab6mTV9.gif)

- 會員功能 - 會員中心 - 歷史訂單查詢 - 訂單資訊 - 實際畫面

https://github.com/user-attachments/assets/332219ef-3826-4132-8bfb-a7cc679a116e

- 後台管理 - 登入

![後台管理(商品管理)](https://imgur.com/4bPTxJZ.png)

- 後台管理 - 登入 - 實際畫面

https://github.com/user-attachments/assets/7117c5d0-e310-4478-b60c-5dc26555df33

- 後台管理 - 商品管理

![後台管理(商品管理)](https://imgur.com/6CH1TMq.png)

- 後台管理 - 訂單管理

![後台管理(訂單管理)](https://imgur.com/7Pffk76.png)

- 後台管理 - 優惠卷管理

![後台管理(優惠卷管理)](https://imgur.com/ZULSb44.png)

- 404 頁面

![404 頁面](https://imgur.com/1o5iKOP.png)

## 圖片引用來源

- [Unsplash](https://unsplash.com/)
- [depositphotos](https://depositphotos.com/)
- [FREEP!K](https://www.freepik.com/)
- [pixabay](https://pixabay.com/)

## 聲明

- 本作品內圖片、內容等，純粹為個人練習前端使用，不做任何商業用途。

## 安裝

> 請務必依據你的專案來調整內容。

以下將會引導你如何安裝此專案到你的電腦上。

Node.js 版本建議為：`14.17.6` 以上...

### 取得專案

```bash
git clone https://github.com/Po-Jui/vue3-ecommerce-pojui.git
```

### 移動到專案內

```bash
cd vue3-ecommerce-pojui
```

### 安裝套件

```bash
npm install
```

### 環境變數設定

請自行創建 `.env` 檔案，並依據下方內容調整相關欄位。

#### API 申請 - [六角學院課程練習 API 申請](https://vue3-course-api.hexschool.io/)

```env!
# API (到六角學院申請)
VUE_APP_API = # API 介面
VUE_APP_PATH = # API 路徑

# Firebase (申請後會給)
VUE_APP_FIREBASE_API_KEY = Firebase API 金鑰
VUE_APP_FIREBASE_AUTH_DOMAIN = Firebase 認證域名
VUE_APP_FIREBASE_PROJECT_ID = Firebase 專案 ID
VUE_APP_FIREBASE_STORAGE_BUCKET = Firebase 儲存空間
VUE_APP_FIREBASE_MESSAGING_SENDER_ID = Firebase 訊息發送者 ID
VUE_APP_FIREBASE_APP_ID = Firebase 應用程式 ID
VUE_APP_FIREBASE_MEASUREMENT_ID = Firebase 測量 ID
...
```

### Firebase 設定

- Authentication ( 開通電子郵件 / 密碼 及 Google )
- Firestore Database ( 建立 orderInfo 及 userInfo 集合)

### 運行專案

```bash
npm run serve
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:8080/
```