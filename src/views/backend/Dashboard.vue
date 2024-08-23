<template>
  <v-app class="bg-white">
    <Navbar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import emitter from "@/methods/emitter";
import Navbar from "@/components/backend/Navbar.vue";
import Toast from "@/alert/Toast";

export default {
  components: {
    Navbar,
    Toast,
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)customToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token === "") {
      this.$router.push("/login");
      Toast.fire({
        icon: "warning",
        title: "您尚未登入，若要進行後台管理請重新登入!",
      });
    } else {
      const api = `${process.env.VUE_APP_CUSTOM_API}admin/check`;
      this.$http
        .post(api, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.success === false) {
            this.$router.push("/login");
            Toast.fire({
              icon: "warning",
              title: "您尚未登入，若要進行後台管理請重新登入!",
            });
          }
        })
        .catch(() => {
          Toast.fire({
            icon: "error",
            title: "您尚未登入，若要進行後台管理請重新登入!",
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 500);
        });
    }
  },
};
</script>
