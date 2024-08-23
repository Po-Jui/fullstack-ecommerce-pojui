<template>
  <swiper
    autoplay
    ref="mySwiper"
    :navigation="true"
    :pagination="true"
    :breakpoints="swiperOption.breakpoints"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in identical" :key="item.id">
      <div class="shopping border-0" @click.prevent="getDetail(item.id)">
        <div class="over-hidden">
          <div class="identical-img" :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
        </div>
        <div class="same-content">
          <h5 class="text-left mb-3">
            {{ item.title }}
          </h5>
          <div class="text-right">
            <span class="product-origin-price pr-2" v-if="item.origin_price !== 0">
              {{ $filters.currency(item.origin_price) }}
            </span>
            <span>
              {{ $filters.currency(item.price) }}
            </span>
          </div>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination"></div>
  </swiper>
</template>

<script>
import Toast from "@/alert/Toast";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/swiper-bundle.esm.js";

export default {
  data() {
    return {
      products: [],
      swiperInstance: null,
      swiperOption: {
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_CUSTOM_API}products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch(() => {
          Toast.fire({
            title: "資料讀取失敗，請耐心等待",
            icon: "error",
          });
        });
    },
    getDetail(id) {
      this.$router.push(`/product/${id}`);
      this.$emit("update");
      window.scrollTo(0, 0);
    },
    onSwiper(swiper) {
      this.swiperInstance = swiper;
    },
    onSlideChange() {
      // console.log("Slide changed");
    },
  },
  computed: {
    identical() {
      return this.products.filter(
        (item) => item.id !== this.product.id && item.category === this.product.category
      );
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.swiperInstance) {
        // console.log(this.swiperInstance); // Now you can access Swiper methods and properties
        this.swiperInstance.slideNext(); // Example method to navigate to the next slide
      } else {
        // console.error("Unable to access Swiper instance");
      }
    });
  },
};
</script>
