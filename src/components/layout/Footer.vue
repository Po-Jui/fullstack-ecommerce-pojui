<template>
  <footer class="position-relative footer-navbar">
    <div class="container rwd-footer">
      <div class="conn d-flex justify-content-between flex-column">
        <ul class="navbar-nav flex-row justify-content-between py-2">
          <li>
            <router-link to="/">
              <span class="sideline">首頁</span>
            </router-link>
          </li>
          <li>
            <router-link to="/products">
              <span class="sideline">商品列表</span>
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <span class="sideline">關於我們</span>
            </router-link>
          </li>
        </ul>
        <p class="mt-3">Copyright © 2024 Belle journée</p>
      </div>
      <div class="footer-logo d-flex align-items-center">
        <a href="#"
          ><div class="d-flex align-items-center">
            <img :src="logo" alt="" />
            <span class="ml-2">{{ logoName }}</span>
          </div></a
        >
      </div>
      <div class="icon-box text-right">
        <ul class="py-2 d-flex justify-content-between">
          <li>
            <a href="#">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/Po-Jui/vue3-ecommerce-pojui/tree/main" target="_blank">
              <i class="fab fa-github fa-2x"></i>
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <i class="fab fa-facebook-square fa-2x"></i>
            </a>
          </li>
        </ul>
        <p class="mt-3">僅做為個人學習使用，非商業用途</p>
      </div>
    </div>
  </footer>
</template>

<script>
import logo from "@/assets/belle.jpg";
export default {
  data() {
    return {
      logo,
      logoName: "Belle journée",
    };
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 992px) {
  .conn {
    display: none !important;
  }
}
</style>
