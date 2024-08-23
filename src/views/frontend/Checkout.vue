<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div class="cart-banner">
      <h2 class="text-center" v-if="order.is_paid === false">結帳</h2>
      <h2 class="text-center" v-else>訂單資訊</h2>
    </div>
    <div class="container">
      <div class="my-5 my-md-4 my-sm row" v-if="order.is_paid === false">
        <div class="col-lg-6 col-md-12 mt-3 order-data-box">
          <section class="card">
            <div class="complete-nav py-2">
              <i class="fas fa-tasks"></i>
              <h3 class="ml-2">訂單付款</h3>
            </div>
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
                      <tr v-for="(product, i) in order.cartInfo" :key="i">
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
                  <div class="d-flex justify-content-between" v-if="order.isCouponUsed">
                    <p>優惠券</p>
                    <p>{{ order.cartInfo[0].coupon.title }}</p>
                  </div>
                  <div class="d-flex justify-content-between mt-3" v-if="order.is_shipfree">
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
                      {{ $filters.currency(order.cartTotal) }}
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
                          {{ order.user.email }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 p-0">顧客姓名</th>
                        <td class="text-right border-0 p-0">
                          {{ order.user.name }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 px-0">顧客電話</th>
                        <td class="text-right border-0 px-0">
                          {{ order.user.tel }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 p-0">顧客地址</th>
                        <td class="text-right border-0 p-0">
                          {{ order.user.address }}
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
                          {{ order.payment }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 px-0 pt-0">付款狀態</th>
                        <td class="text-right border-0 px-0 pt-0">
                          <span class="text-danger" v-if="order.is_paid === false">尚未付款</span>
                          <strong v-else class="text-success">付款完成</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
            <div class="px-4 py-3 footer-data-box bg-undone">
              <a
                href="#"
                @click.prevent="comeBack"
                class="text-dark"
                v-if="order.is_paid === false"
              >
                <i class="fas fa-reply mr-2"></i>
                回首頁
              </a>
              <div class="text-right" v-if="order.is_paid === true">
                <button
                  class="btn btn-outline-dark border-0 font-weight-bolder"
                  @click.prevent="payOrder()"
                  :disabled="isProcessing"
                >
                  <i class="fas fa-spinner fa-spin"> </i>
                  確認付款
                </button>
              </div>
              <div class="text-right" v-else>
                <button
                  class="btn btn-outline-dark border-0 font-weight-bolder"
                  @click.prevent="payOrder()"
                >
                  確認付款
                </button>
              </div>
              <v-dialog v-model="loading" hide-overlay persistent max-width="300">
                <v-card>
                  <v-card-text>
                    <div class="text-center">
                      <v-progress-circular
                        :size="70"
                        :width="7"
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                      <p>正在處理您的訂單付款...</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </section>
        </div>
      </div>
      <Successful v-else-if="order.is_paid === true" :orderInfo="order" />
    </div>
  </div>
</template>

<script>
import Successful from "@/components/frontend/Successful.vue";
import Toast from "@/alert/Toast";
import { db } from "@/methods/firebase";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      order: {},
      orderId: "",
      isLoading: false,
      isProcessing: false,
      loading: false,
    };
  },
  components: {
    Successful,
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder(this.orderId);
  },
  methods: {
    async getOrder(orderId) {
      this.isLoading = true;
      const orderDoc = doc(db, "orderInfo", orderId);
      const orderDocSnap = await getDoc(orderDoc);
      if (orderDocSnap.exists()) {
        // 獲取訂單數據
        const orderData = orderDocSnap.data();
        const subCollection = collection(orderDoc, "cartInfo");
        const subCollectionSnap = await getDocs(subCollection);
        const subCollectionData = [];
        subCollectionSnap.forEach((doc) => {
          subCollectionData.push(doc.data());
        });
        this.order = {
          ...orderData,
          cartInfo: { ...subCollectionData },
        };
        console.log(this.order);
        this.isLoading = false;
      } else {
        console.log("No such document!");
        Toast.fire({
          title: "資料讀取失敗，請稍後再試",
          icon: "error",
        });
        this.isLoading = false;
      }
    },
    payOrder() {
      this.loading = true;
      const url = `${process.env.VUE_APP_CUSTOM_API}pay/${this.orderId}`;
      this.isProcessing = true;
      // 模擬結帳過程
      setTimeout(() => {
        this.$http
          .post(url)
          .then((res) => {
            const timestamp = Math.floor(new Date().getTime() / 1000); // 獲取當前timestamp
            if (res.data.success) {
              this.fetchUserData(timestamp);
              setTimeout(() => {
                this.getOrder(this.orderId);
              }, 1000);
              this.loading = false;
              Toast.fire({
                title: "付款成功",
                icon: "success",
              });
            }
            this.isProcessing = false;
          })
          .catch(() => {
            Toast.fire({
              title: "付款失敗，請稍後再試",
              icon: "error",
            });
            this.isProcessing = false;
          });
      }, 3000);
    },
    async fetchUserData(timestamp) {
      // 指定集合和文檔 ID
      const orderRef = doc(db, "orderInfo", this.orderId);
      const userRef = doc(db, "userInfo", this.order.uid);
      const userDocSnap = await getDoc(userRef);
      const userData = userDocSnap.data();
      await updateDoc(orderRef, {
        is_paid: true,
        paid_date: timestamp,
      });
      userData.orders.forEach((order) => {
        if (order.orderId === this.orderId) {
          order.is_paid = true;
          order.paid_date = timestamp;
          // 更新 userInfo 文檔
          updateDoc(userRef, {
            orders: userData.orders,
          });
        }
      });
    },
    comeBack() {
      this.$router.push("/");
      Toast.fire({
        title: "尚未付款",
        icon: "warning",
      });
    },
  },
};
</script>
