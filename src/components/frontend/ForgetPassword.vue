<template>
  <div>
    <v-card class="elevation-12">
      <v-card-text>
        <v-form ref="forgetPassword">
          <v-text-field
            prepend-icon="mdi-email"
            ref="forgetPassword"
            v-model.trim="forgetPassword"
            :rules="[rules.required, rules.email]"
            label="請輸入email"
          ></v-text-field>
          <v-btn class="mt-2" type="submit" block @click.prevent="findPassword">重設密碼</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/methods/firebase";
import Toast from "@/alert/Toast";
export default {
  name: "ForgetPassword",
  data() {
    return {
      forgetPassword: "",
      rules: {
        required: (value) => !!value || "此欄位為必填項",
        email: (value) => {
          const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          return pattern.test(value) || "請輸入有效的電子郵件地址";
        },
      },
    };
  },
  methods: {
    findPassword() {
      this.$refs.forgetPassword.validate().then((res) => {
        console.log(res);
        if (res.length > 0) {
          Toast.fire({
            icon: "error",
            title: "請輸入正確資訊",
          });
        } else {
          sendPasswordResetEmail(auth, this.forgetPassword)
            .then(() => {
              Toast.fire({
                icon: "success",
                title:
                  "如果您的信箱已註冊，我們將發送密碼重置郵件給您，請至您的信箱點選信中連結設定新密碼",
              });
              this.forgetPassword = "";
              this.$emit("switchTab", 0);
              this.$refs.forgetPassword.reset();
            })
            .catch((error) => {
              console.log(`錯誤：${error.message}`);
              switch (error.message) {
                case "Firebase: Error (auth/missing-email).":
                  Toast.fire({
                    icon: "error",
                    title: "請輸入正確信箱",
                  });
                  break;
              }
            });
        }
      });
    },
  },
};
</script>
