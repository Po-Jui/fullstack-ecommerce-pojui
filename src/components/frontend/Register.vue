<template>
  <div>
    <v-card class="elevation-12">
      <v-card-text
        ><v-form ref="registerForm" v-model="valid" lazy-validation>
          <v-text-field
            prepend-icon="mdi-account-arrow-left"
            v-model.trim="register.firstName"
            :rules="[rules.required, rules.noSpacesOrSpecial]"
            label="名字"
            placeholder="請輸入名字"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-account-arrow-right"
            v-model.trim="register.lastName"
            :rules="[rules.required, rules.noSpacesOrSpecial]"
            label="姓氏"
            placeholder="請輸入姓氏"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-email"
            v-model.trim="register.email"
            :rules="[rules.required, rules.email]"
            label="電子郵件"
            placeholder="請輸入email"
            required
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            v-model.trim="register.password"
            :rules="[
              rules.required,
              rules.hasUpperCase,
              rules.hasLowerCase,
              rules.min,
              rules.noSpacesOrSpecial,
            ]"
            label="密碼"
            placeholder="請輸入密碼"
            required
          >
            <template v-slot:append>
              <v-icon
                @mousedown="togglePasswordVisibility(true)"
                @mouseup="togglePasswordVisibility(false)"
              >
                {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
              </v-icon>
            </template>
          </v-text-field>
          <v-text-field
            :type="showconfirmPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock-check"
            v-model.trim="register.confirmPassword"
            :rules="[rules.required, passwordMatch]"
            label="密碼確認"
            placeholder="請再輸入一次密碼"
            required
          >
            <template v-slot:append>
              <v-icon
                @mousedown="toggleConfirmPasswordVisibility(true)"
                @mouseup="toggleConfirmPasswordVisibility(false)"
              >
                {{ showconfirmPassword ? "mdi-eye" : "mdi-eye-off" }}
              </v-icon>
            </template>
          </v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click.prevent="registerSubmit">提交</v-btn>
          </v-card-actions>
        </v-form></v-card-text
      >
    </v-card>
  </div>
</template>

<script>
import Toast from "@/alert/Toast";
import { auth, db } from "@/methods/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
export default {
  data() {
    return {
      valid: false, // form驗證
      register: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      showPassword: false,
      showconfirmPassword: false,
      rules: {
        noSpacesOrSpecial: (value) => {
          const pattern = /^[^\s!@#$%^&*(),.?":{}|<>]*$/; // Regular expression to disallow spaces and special characters
          return pattern.test(value) || "不得包含空白或特殊符號";
        },
        required: (value) => !!value || "此欄位為必填項",
        email: (value) => {
          const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          return pattern.test(value) || "請輸入有效的電子郵件地址";
        },
        min: (value) => value.length >= 6 || "密碼至少需要6個字符",
        max: (value) => value.length <= 25 || "姓名最多25個字符",
        hasUpperCase: (value) => /[A-Z]/.test(value) || "需包含至少一個大寫英文字母",
        hasLowerCase: (value) => /[a-z]/.test(value) || "需包含至少一個小寫英文字母",
      },
    };
  },
  methods: {
    // 顯示密碼
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showconfirmPassword = !this.showconfirmPassword;
    },
    // 註冊
    passwordMatch(value) {
      return value === this.register.password || "密碼不匹配";
    },
    registerSubmit() {
      this.isLoading = true;
      this.isRegistering = true;
      this.$refs.registerForm.validate().then((res) => {
        if (res.valid === false) {
          Toast.fire({
            icon: "error",
            title: "請輸入正確資訊",
          });
        } else {
          // Firebase API 傳入auth物件、信箱和密碼 可創立帳號
          createUserWithEmailAndPassword(auth, this.register.email, this.register.password)
            .then((res) => {
              const user = res.user;
              updateProfile(user, {
                displayName: this.register.firstName + " " + this.register.lastName,
              }).then(() => {
                // 設定認證信箱的基本設定
                auth.languageCode = "zh-TW";
                // Firebase API 會寄認證信給指定信箱 要把auth.currentUser傳入
                sendEmailVerification(auth.currentUser).then(() => {
                  Toast.fire({
                    icon: "success",
                    title: "註冊成功，驗證信已發送到您的信箱，請點選信中驗證連結",
                  });
                });
              });
              this.addUserInfoWithCustomId(user.uid);
              this.register = {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                confirmPassword: "",
              };
              this.$refs.registerForm.reset();
              this.$emit("switchTab", 0);
            })
            .catch((error) => {
              console.log(`錯誤：${error.message}`);
              switch (error.message) {
                case "Firebase: Error (auth/email-already-in-use).":
                  Toast.fire({
                    icon: "error",
                    title: "帳號已註冊，請到登入頁面登入",
                  });
                  break;
                default:
                  Toast.fire({
                    icon: "error",
                    title: "註冊失敗",
                  });
                  break;
              }
            });
        }
      });
      this.isLoading = false;
    },
    // 增加新用户的 uid 到 userInfo 集合
    async addUserInfoWithCustomId(userId) {
      try {
        // 指定集合和文檔 ID
        const userDoc = doc(db, "userInfo", userId);

        // 添加文檔數據
        await setDoc(userDoc, {
          address: "",
          phoneNumber: "",
          photoURL: null,
          orders: [],
          cartItem: [],
          favorite: [],
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  },
};
</script>

<style></style>
