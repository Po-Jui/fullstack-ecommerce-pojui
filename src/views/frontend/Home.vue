<template>
  <div id="home" class="home-bg">
    <v-carousel
      class="home-carousel"
      cycle
      :interval="5000"
      :hide-delimiters="true"
      :show-arrows="false"
      transition="slide-x-transition"
    >
      <v-carousel-item class="home-banner" cover></v-carousel-item>
      <v-carousel-item class="home-banner-two" cover></v-carousel-item>
      <v-carousel-item class="home-banner-three" cover></v-carousel-item>
      <div class="container banner-tit-box">
        <div class="banner-tit text-center">
          <h1 class="mb-3">Belle journée</h1>
          <p>療癒心靈的香氣 點燃生活的美好</p>
          <router-link to="/products" class="text-dark float-right go-btn mt-3">
            前往購物
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>
      <div class="down-box">
        <a class="down-btn" href="#news" @click.prevent="scrollNews">
          <i class="fas fa-chevron-down"></i>
        </a>
      </div>
    </v-carousel>
    <div class="container pb-2 pt-5 mb-5">
      <div class="row mx-0 justify-content-center align-items-center">
        <section class="col-lg-8 col-md-12 news-box" id="news">
          <h3 class="font-weight-bolder text-center h4 mb-3">最新消息</h3>
          <ul class="news-group">
            <li data-aos="fade-left">
              <p>
                <span class="date-new mr-2">2024 / 07 / 19</span>
                歡慶店長挖到礦，每人享有 8 折優惠：supergay80
              </p>
            </li>
            <li data-aos="fade-left" data-aos-delay="50">
              <p>
                <span class="date-new mr-2">2024 / 07 / 05</span>
                歡慶開幕，商品全面 85 折
              </p>
            </li>
            <li data-aos="fade-left" data-aos-delay="100">
              <p>
                <span class="date-new mr-2">2024 / 06 / 25</span>
                試營運期間，只要金額滿 599 元，享有免運優惠
              </p>
            </li>
            <li data-aos="fade-left" data-aos-delay="150">
              <p>
                <span class="date-new mr-2">2024 / 06 / 19</span>
                Belle journée 電商即將上市
              </p>
            </li>
            <li data-aos="fade-left" data-aos-delay="200">
              <p>
                <span class="date-new mr-2">2024 / 05 / 19</span>
                Belle journée 整修中，敬請期待！
              </p>
            </li>
          </ul>
          <ul class="m-news-group">
            <li data-aos="fade-left">
              <p class="date-new">2024 / 07 / 19</p>
              <p>歡慶店長挖到礦，每人享有 8 折優惠：supergay80</p>
            </li>
            <li data-aos="fade-left" data-aos-delay="50">
              <p class="date-new">2024 / 07 / 05</p>
              <p>歡慶開幕，商品全面 85 折</p>
            </li>
            <li data-aos="fade-left" data-aos-delay="100">
              <p class="date-new">2024 / 06 / 25</p>
              <p>試營運期間，只要金額滿 599 元，享有免運優惠</p>
            </li>
            <li data-aos="fade-left" data-aos-delay="150">
              <p class="date-new">2024 / 06 / 19</p>
              <p>Belle journée 電商即將上市</p>
            </li>
            <li data-aos="fade-left" data-aos-delay="200">
              <p class="date-new">2024 / 05 / 19</p>
              <p>Belle journée 整修中，敬請期待！</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <div class="divider-bg">
      <h3 class="font-weight-bold">商品專區</h3>
    </div>
    <div class="home-footer">
      <HomeProducts />
    </div>
  </div>
</template>

<script>
/* global $ */
import HomeProducts from "@/components/frontend/HomeProducts.vue";

export default {
  data() {
    return {};
  },
  components: {
    HomeProducts,
  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    scrollNews() {
      const target = $(".down-btn").attr("href");
      const targetPos = $(target).offset().top;
      $("html,body").animate(
        {
          scrollTop: targetPos - 90,
        },
        1000
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.home-carousel {
  height: 100vh !important;
}

@media (max-width: 992px) {
  .home-carousel {
    height: 50vh !important;
  }
}
</style>
