<template>
  <div class="login-bg">
    <h1 class="title-backend-login">後臺管理</h1>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <h1 class="font-weight-bold">請先登入</h1>
            </v-card-title>
            <v-card-subtitle>
              <v-form
                @submit.prevent="firebaseSignIn(user.username, user.password)"
                v-model="isValid"
                ref="form"
              >
                <v-text-field
                  class="mb-1"
                  v-model="user.username"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                  placeholder="請輸入 Email"
                  type="email"
                  required
                  autofocus
                />
                <v-text-field
                  v-model="user.password"
                  :rules="[rules.required]"
                  label="Password"
                  placeholder="請輸入密碼"
                  type="password"
                  required
                />
                <div class="text-right">
                  <v-btn class="mt-4 mb-4" color="primary" :disabled="!isValid" type="submit" large>
                    登入
                  </v-btn>
                </div>
              </v-form>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Toast from "@/alert/Toast";
import { authBack } from "@/methods/firebase-backend";
import { signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      isValid: false,
      user: {
        username: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || "欄位必填",
        email: (value) => /.+@.+\..+/.test(value) || "請輸入有效的 email",
      },
    };
  },
  components: {
    Toast,
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)customToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log(token);
    if (token) {
      const api = `${process.env.VUE_APP_CUSTOM_API}admin/check`;
      this.$http
        .post(api, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            Toast.fire({
              icon: "warning",
              title: "您已登入，請勿重複登入",
            });
            this.$router.push("/dashboard/products");
          }
        })
        .catch(() => {});
    }
  },
  methods: {
    async firebaseSignIn(username, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(authBack, username, password);
        if ("customAttributes" in userCredential.user.reloadUserInfo) {
          const idToken = await userCredential.user.getIdToken();
          this.signIn(idToken);
        } else {
          Toast.fire({
            icon: "error",
            title: "登入失敗，權限不足",
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "登入失敗，帳號或密碼輸入錯誤",
        });
      }
    },
    signIn(idToken) {
      const api = `${process.env.VUE_APP_CUSTOM_API}admin/signin`;
      this.$http
        .post(api, { idToken })
        .then((res) => {
          if (res.data.success) {
            Toast.fire({
              icon: "success",
              title: "登入成功",
            });
            this.$refs.form.reset();
            // 將 token 存入 cookie 中
            const { token, expired } = res.data;
            document.cookie = `customToken=${token}; expires=${new Date(expired)}`;
            this.$router.push("/dashboard/products");
          } else {
            Toast.fire({
              icon: "error",
              title: "登入失敗，帳號或密碼輸入錯誤",
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.title-backend-login {
  text-align: center;
  font: 1em sans-serif;
  font-weight: bold;
  margin-bottom: 30px;
  letter-spacing: 5px;
  color: rgba(0, 0, 0, 0.5);
  text-shadow: 2px 2px 4px #a6a6a6;
  font-size: 40px;
}
.login-bg {
  background-image: url("https://images.unsplash.com/photo-1456940645424-adda95a2af4c?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  height: 100vh;
}
:deep(.v-input__details) {
  display: initial !important;
}
</style>
