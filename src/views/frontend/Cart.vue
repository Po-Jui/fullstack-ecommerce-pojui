<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div class="cart-banner">
      <h2 class="text-center">購物車</h2>
    </div>
    <div class="container my-5 m-cart-box">
      <div class="row align-items-center">
        <div
          class="col-lg-8 commodity-box"
          :class="{ 'col-lg-12': fareTotal <= 0, 'none-commodity': fareTotal <= 0 }"
        >
          <div v-if="carts.length > 0">
            <table class="mt-3">
              <thead class="font-weight-bold">
                <tr>
                  <th></th>
                  <th class="text-left">商品</th>
                  <th class="text-center">數量</th>
                  <th>單位</th>
                  <th class="text-right">單價</th>
                </tr>
              </thead>
              <tbody class="border-y">
                <tr v-for="item in carts" :key="item.product_id + 1">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger-trash btn-sm"
                      @click="removeCartItem(item.product_id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                  </td>
                  <td class="produce-num-td">
                    <div class="produce-num-group d-flex">
                      <div class="num-btnbox">
                        <button class="btn" @click="quantityUpdata(item.product_id, item.qty - 1)">
                          <i class="fas fa-minus"></i>
                        </button>
                      </div>
                      <input
                        type="number"
                        class="form-control text-center numbox"
                        :value="item.qty"
                        @keyup.enter="quantityUpdata(item.product_id, $event.target.value)"
                      />
                      <div class="num-btnbox">
                        <button class="btn" @click="quantityUpdata(item.product_id, item.qty + 1)">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td><span>/</span> {{ item.product.unit }}</td>
                  <td class="text-right">
                    {{ $filters.currency(item.product.price) }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4">
                    <button
                      type="button"
                      class="btn btn-del-all sideline btn-sm float-left my-3"
                      @click="removeAllCartItem()"
                    >
                      <i class="far fa-trash-alt"> </i>
                      <span class="pl-2">刪除所有商品</span>
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="mb-3 no-shop-box" v-else>
            <p class="py-5 mt-3">哎呀！您的購物車是空的，趕快去挑選美品吧！</p>
            <router-link to="/products" class="text-dark">
              <i class="fas fa-reply mr-2"></i>
              繼續購買
            </router-link>
          </div>
        </div>
        <div class="col-lg-4 my-3 card order-price" :class="{ 'd-none': fareTotal <= 0 }">
          <div class="card-body">
            <h3>訂單價格</h3>
            <div class="px-4 mt-3">
              <p class="d-flex justify-content-between">
                <span>小計：</span>
                <span>{{ $filters.currency(cartTotal) }}</span>
              </p>
              <p class="d-flex fare justify-content-between" v-if="cartTotal !== 0">
                <span>運費：</span>
                <span v-if="cartTotal > 599"> NT 0</span>
                <span v-else> NT 60</span>
              </p>
              <hr class="m-0 my-2" />
              <p class="text-right promotion" v-if="cartTotal < 599 || cartTotal === 0">
                優惠促銷：滿 599 免運
              </p>
              <p class="text-right free" v-else>已達免運優惠</p>
              <p class="d-flex justify-content-between">
                <span>總計：</span>
                <span>
                  {{ $filters.currency(fareTotal) }}
                </span>
              </p>
              <hr class="hr-opa" />
              <div class="mt-3 mb-2 check-box">
                <div>
                  <router-link to="/products" class="continue-buy" v-if="carts.length > 0">
                    <i class="fas fa-reply mr-2"></i>
                    繼續購買
                  </router-link>
                </div>
                <div class="float-right">
                  <router-link
                    to="/order"
                    class="btn btn-shopping checkout"
                    :class="{ disabled: fareTotal <= 0 }"
                  >
                    結帳
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="bg-cart-footer" v-if="!isLoading">
      <div class="container pt-4">
        <h4 class="font-weight-bold text-center h4">香氛蠟燭冷知識</h4>
        <div class="row mt-4 m-footer-cart">
          <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
            <div
              class="knowledge-img position-relative"
              style="
                background-image: url(https://images.unsplash.com/photo-1489176876421-3b720db0fb3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
              "
            >
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">燃燒溫度</h5>
                <p class="px-4 my-3">
                  香氛蠟燭的火焰溫度約為1000°C，因此要小心放置，避免接觸易燃物。
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
            <div
              class="knowledge-img position-relative"
              style="
                background-image: url(https://images.unsplash.com/photo-1602523961358-f9f03dd557db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
              "
            >
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">熔點差異</h5>
                <p class="px-4 my-3">
                  蜂蠟的熔點約為62-64°C，石蠟蠟燭的熔點約為46-68°C，大豆蠟的熔點約為49-55°C。
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
            <div
              class="knowledge-img position-relative"
              style="
                background-image: url(https://images.unsplash.com/photo-1495640452828-3df6795cf69b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
              "
            >
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">歷史用途</h5>
                <p class="px-4 my-3">
                  香氛蠟燭在歷史上常被用於宗教儀式、醫療用途和貴族宴會，以掩蓋不良氣味或創造特定氛圍。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Toast from "@/alert/Toast";
import { auth, db } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      carts: {},
      cartTotal: 0,
      fareTotal: 0,
      isLoading: false,
      products: {},
      coupon_code: "",
      userCartItems: [],
      uid: null,
    };
  },
  created() {
    this.getAuthState();
  },
  watch: {
    uid(newVal, oldVal) {
      if (newVal) {
        console.log("User is logged in with UID:", newVal);
        // this.updateUserCartItem(); // 可以在這裡調用更新購物車方法
      } else {
        console.log("User is logged out or email is not verified");
        // 在這裡處理用戶登出或未驗證的情況
        this.$router.replace("/userlogin");
      }
    },
  },
  methods: {
    getAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.emailVerified) {
            this.uid = user.uid;
            this.getCart(user.uid);
          } else {
            this.uid = null; // 如果 email 未驗證，清空 uid
          }
        } else {
          this.uid = null; // 如果沒有用戶，清空 uid
          Toast.fire({
            icon: "warning",
            title: "請先登入會員",
          });
          this.$router.replace("/userlogin");
        }
      });
    },
    async updateUserCartItem(item) {
      const userRef = collection(db, "userInfo");
      const userDocRef = doc(userRef, this.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        this.userCartItems = docSnap.data().cartItem;
        if (item !== undefined) {
          this.userCartItems = item;
          await updateDoc(userDocRef, {
            cartItem: this.userCartItems,
          });
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    getCart(uid) {
      // console.log(uid);
      const url = `${process.env.VUE_APP_CUSTOM_API}cart/${uid}`;
      this.isLoading = true;
      setTimeout(() => {
        this.$http
          .get(url)
          .then((response) => {
            this.carts = response.data.data.carts;
            if (this.uid !== null) {
              this.updateUserCartItem(this.carts);
            }
            this.updateTotal();
            this.isLoading = false;
          })
          .catch(() => {
            Toast.fire({
              title: "資料讀取失敗，請稍後再試",
              icon: "error",
            });
            this.isLoading = false;
          });
      }, 1000);
    },
    updateTotal() {
      let total = 0;
      this.carts.forEach((item) => {
        total += item.product.price * item.qty;
      });
      this.cartTotal = total;
      if (total >= 599 || total === 0) {
        this.fareTotal = total;
      } else {
        this.fareTotal = total + 60;
      }
    },
    quantityUpdata(id, num) {
      this.isLoading = true;
      num = parseInt(num);
      setTimeout(() => {
        if (num >= 1) {
          const url = `${process.env.VUE_APP_CUSTOM_API}cart/${this.uid}`;
          const cart = {
            product_id: id,
            qty: num,
          };
          this.$http.put(url, { data: cart }).then((response) => {
            console.log(response);
            this.getCart(this.uid);
            this.isLoading = false;
          });
        } else {
          Toast.fire({
            title: "數量不得小於1",
            icon: "error",
          });
          this.isLoading = false;
        }
      }, 1000);
    },
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_CUSTOM_API}cart/${this.uid}/${id}`;
      this.$http
        .delete(url)
        .then((response) => {
          this.$emitter.emit("update-total", this.uid); // 更新購物車數量
          this.getCart(this.uid);
          this.isLoading = false;
          Toast.fire({
            title: "商品已刪除",
            icon: "success",
          });
        })
        .catch(() => {
          this.isLoading = false;
          Toast.fire({
            title: "商品刪除失敗",
            icon: "error",
          });
        });
    },
    removeAllCartItem() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_CUSTOM_API}cart/${this.uid}`;
      this.$http
        .delete(url)
        .then(() => {
          this.$emitter.emit("update-total", this.uid);
          this.getCart(this.uid);
          this.cartTotal = 0;
          this.isLoading = false;
          Toast.fire({
            title: "商品已全部刪除",
            icon: "success",
          });
        })
        .catch(() => {
          this.isLoading = false;
          Toast.fire({
            title: "商品刪除失敗",
            icon: "error",
          });
        });
    },
  },
};
</script>
