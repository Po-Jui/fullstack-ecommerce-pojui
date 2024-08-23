<template>
  <section class="container">
    <div class="row mt-4 align-items-center">
      <div class="int-mb col-lg-6 col-md-12">
        <div
          class="minor-img"
          style="
            background-image: url(https://storage.googleapis.com/www-cw-com-tw/article/202111/article-618b0686bc1b8.jpg);
          "
        >
          <div class="introTitle">
            <h4>香氛蠟燭</h4>
          </div>
          <a href="#" @click.prevent="toCategory('香氛蠟燭')">
            <div
              class="primary-img"
              style="
                background-image: url(https://storage.googleapis.com/www-cw-com-tw/article/202111/article-618b0686bc1b8.jpg);
              "
            ></div>
          </a>
        </div>
      </div>
      <div class="col-lg-5 col-md-12" data-aos="fade-up">
        <div class="intro-box">
          <div class="int">
            <h5 class="font-weight-bolder position-relative pt-3 pb-2">香氛蠟燭</h5>
            <p class="my-3">
              本店採用純天然的香料提供自然的香氛，提供顧客更純淨、更自然的燃燒體驗。
            </p>
            <a href="#" class="btn btn-outline-dark" @click.prevent="toCategory('香氛蠟燭')">
              查看商品
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4 align-items-center flex-row-reverse">
      <div class="int-mb col-lg-6 col-md-12">
        <div
          class="minor-img minor-img-right ml-1"
          style="
            background-image: url(https://whitecompany.scene7.com/is/image/whitecompany/Calm-Diffuser-Refill---200ml/A04019_XS21_1_C?$D_S_PDP$);
          "
        >
          <div class="introTitle poles-title">
            <h4>擴香</h4>
          </div>
          <a href="#" @click.prevent="toCategory('擴香')">
            <div
              class="primary-img poles-img"
              style="
                background-image: url(https://whitecompany.scene7.com/is/image/whitecompany/Calm-Diffuser-Refill---200ml/A04019_XS21_1_C?$D_S_PDP$);
              "
            ></div>
          </a>
        </div>
      </div>
      <div class="col-lg-5 col-md-12" data-aos="fade-up">
        <div class="intro-box">
          <div class="int">
            <h5 class="font-weight-bolder position-relative pt-3 pb-2">擴香</h5>
            <p class="my-3">
              根據不同使用情境設計的擴香，可根據消費者的偏好進行選購，滿足不同品味和需求。
            </p>
            <a href="#" class="btn btn-outline-dark" @click.prevent="toCategory('擴香')">
              查看商品
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4 align-items-center">
      <div class="int-mb col-lg-6 col-md-12">
        <div
          class="minor-img"
          style="
            background-image: url(https://whitecompany.scene7.com/is/image/whitecompany/Signature-Fragrance-Oil-Set/FODSS_AU22_1_L?$D_S_PDP$);
          "
        >
          <div class="introTitle">
            <h4>精油</h4>
          </div>
          <a href="#" @click.prevent="toCategory('精油')">
            <div
              class="primary-img"
              style="
                background-image: url(https://whitecompany.scene7.com/is/image/whitecompany/Signature-Fragrance-Oil-Set/FODSS_AU22_1_L?$D_S_PDP$);
              "
            ></div>
          </a>
        </div>
      </div>
      <div class="col-lg-5 col-md-12" data-aos="fade-up">
        <div class="intro-box">
          <div class="int">
            <h5 class="font-weight-bolder position-relative pt-3 pb-2">精油</h5>
            <p class="my-3">精油因其多功能性和天然特性，成為健康和美容的理想選擇。</p>
            <a href="#" class="btn btn-outline-dark" @click.prevent="toCategory('精油')">
              查看商品
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toCategory(tag) {
      this.$router.push({
        name: "products",
        params: { categoryName: tag },
      });
    },
  },
};
</script>
