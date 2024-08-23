<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <ScrollTop :style="{ opacity: isOpacity }" />
    <Footer></Footer>
    <UserLogin></UserLogin>
  </div>
</template>

<script>
import emitter from "@/methods/emitter";
import ScrollTop from "@/components/ScrollTop.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import UserLogin from "@/methods/loginState.vue";

export default {
  components: {
    Header,
    ScrollTop,
    Footer,
    UserLogin,
  },
  data() {
    return {
      scrollTop: null,
      isOpacity: 0,
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
      if (this.scrollTop > 150) {
        this.isOpacity = 1;
      } else {
        this.isOpacity = 0;
      }
    });
  },
};
</script>
