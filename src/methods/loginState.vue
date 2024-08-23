<template></template>

<script>
import Toast from "@/alert/Toast";
import { auth } from "@/methods/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  data() {
    return {
      displayName: "", // 登入後顯示的會員名稱
    };
  },

  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          this.displayName = user.displayName;
        }
      }
    });
  },
  mounted() {
    this.$emitter.on("logout-user", () => {
      this.logout();
    });
  },
  beforeUnmount() {
    this.$emitter.off("logout-user", () => {
      this.logout();
    });
  },
  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: `${this.displayName}貴賓，期待您的再次光臨`,
          });
          this.$emitter.emit("update-user-status"); // 更新登入狀態
        })
        .catch(() => {
          Toast.fire({
            icon: "error",
            title: "發生錯誤，請重新整理頁面",
          });
        });
    },
  },
};
</script>
