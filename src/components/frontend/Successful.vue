<template>
  <div class="my-lg-5 my-md row">
    <div class="col-lg-10 p-0 m-auto">
      <div class="success-box">
        <section class="w-50 left-content">
          <h5 class="order-logo">Belle journée</h5>
          <div class="vrl">
            <p>感謝您的購買</p>
            <br />
            <p class="r-text">祝您天天愉悅</p>
          </div>
          <div class="mb-3">
            <button
              type="button"
              class="btn font-weight-bolder"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="getOrder()"
            >
              <i class="fas fa-angle-right"></i>
              查詢明細
              <i class="fas fa-angle-left"></i>
            </button>
          </div>
        </section>
        <div class="w-50 m-thank-bg">
          <div class="right-content" :style="{ backgroundImage }"></div>
        </div>
      </div>
      <div class="m-success-box col-10">
        <section>
          <h5 class="order-logo">Belle journée</h5>
          <div class="vrl">
            <p>感謝您的購買</p>
            <br />
            <p class="r-text">祝您天天愉悅</p>
          </div>
          <div class="mb-3">
            <button
              type="button"
              class="btn font-weight-bolder"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="getOrder()"
            >
              <i class="fas fa-angle-right"></i>
              查詢明細
              <i class="fas fa-angle-left"></i>
            </button>
          </div>
        </section>
      </div>
      <div class="pt-3">
        <router-link to="/products" class="text-dark m-keepBuy">
          <i class="fas fa-reply mr-2"></i>
          繼續購買
        </router-link>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade mt-5 customer-modal-box"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered mt-5 px-lg-5 px-rwd"
        v-if="isGetInfo === false"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-dark py-2">
            <h5 class="modal-title text-danger font-weight-bolder" id="exampleModalLabel">
              <i class="fas fa-warning mr-2"></i>錯誤
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">資料讀取失敗，請稍後再試!</div>
        </div>
      </div>

      <div class="modal-dialog mt-5 px-lg-5 px-rwd" v-else>
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title font-weight-bolder" id="exampleModalLabel">購物明細</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-0">
            <div class="px-4">
              <ul>
                <li class="py-2">
                  <table class="mt-2 w-100">
                    <thead class="font-weight-bold" style="border-bottom: 1px solid #00000024">
                      <tr>
                        <th class="pb-2">產品名稱</th>
                        <th class="text-center">數量</th>
                        <th class="text-right">價格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(product, i) in orderInfo.cartInfo" :key="i">
                        <td class="pt-2">{{ product.product.title }}</td>
                        <td class="text-center">
                          {{ product.qty }} /
                          {{ product.product.unit }}
                        </td>
                        <td class="text-right">
                          {{ $filters.currency(product.product.price) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <li class="py-2" style="border-top: 1px solid #00000024">
                  <div class="d-flex justify-content-between" v-if="orderInfo.isCouponUsed">
                    <p>優惠券</p>
                    <p>{{ orderInfo.cartInfo[0].coupon.title }}</p>
                  </div>
                  <div class="d-flex justify-content-between mt-3" v-if="orderInfo.is_shipfree">
                    <p>運費</p>
                    <p class="text-success">免運</p>
                  </div>
                  <div class="d-flex justify-content-between mt-3" v-else>
                    <p>運費</p>
                    <p>NT 60</p>
                  </div>
                </li>
                <li class="pt-2 d-flex justify-content-between border-0">
                  <p>總金額</p>
                  <p class="text-right">
                    <span>
                      {{ $filters.currency(orderInfo.cartTotal) }}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
            <hr />
            <div class="px-4">
              <ul class="customer-data">
                <li>
                  <h4 class="text-center font-weight-bold my-2">顧客資料</h4>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th scope="row" class="border-0 px-0">Email</th>
                        <td class="text-right border-0 px-0">
                          {{ user.email }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 p-0">顧客姓名</th>
                        <td class="text-right border-0 p-0">
                          {{ user.name }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 px-0">顧客電話</th>
                        <td class="text-right border-0 px-0">
                          {{ user.tel }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 p-0">顧客地址</th>
                        <td class="text-right border-0 p-0">
                          {{ user.address }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <li class="px-0">
                  <table class="table">
                    <tbody>
                      <tr>
                        <th scope="row" class="border-0 px-0">付款方式</th>
                        <td class="text-right border-0 px-0">
                          {{ orderInfo.payment }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 px-0 pt-0">付款狀態</th>
                        <td class="text-right border-0 px-0 pt-0">
                          <strong class="text-success">付款完成</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer p-1 bg-complete">
            <p>成立訂單後約 3 ~ 5 個工作天出貨。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "@/alert/Toast";

export default {
  props: {
    orderInfo: {
      type: Object,
    },
  },
  data() {
    return {
      user: {},
      orderId: "",
      isLoading: false,
      isGetInfo: false,
      backgroundImage: `url('https://images.unsplash.com/photo-1636109751387-e5e2434268e3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    };
  },
  created() {
    this.isLoading = true;
    this.orderId = this.$route.params.orderId;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
  methods: {
    // 檢查物件是否為空的方法
    isEmptyObject(obj) {
      if (Object.keys(obj).length === 0) {
        console.log("Object is empty");
        this.isGetInfo = false;
        Toast.fire({
          title: "資料讀取失敗，請稍後再試",
          icon: "error",
        });
      } else {
        this.isGetInfo = true;
        this.user = this.orderInfo.user;
        console.log("Object is not empty");
      }
    },
    getOrder() {
      this.isEmptyObject(this.orderInfo);
    },
  },
};
</script>
