<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div class="cart-banner">
      <h2 class="text-center">購物清單</h2>
    </div>
    <div class="container cost-list-box" v-if="carts.length > 0">
      <div class="row mobile-flex">
        <div class="col-lg-6 col-md-12 client-form-box">
          <v-form class="form-data-box p-2" ref="form" v-model="isValid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <h3 class="font-weight-bold mb-3">訂單資料</h3>
                  <!-- 收件人姓名 -->
                  <v-text-field
                    class="font-weight-bold mb-1"
                    v-model.trim="form.user.name"
                    :rules="[rules.required]"
                    label="收件人姓名"
                    placeholder="輸入姓名"
                    dense
                    outlined
                    required
                  ></v-text-field>
                  <!-- 電話 -->
                  <v-text-field
                    class="font-weight-bold mb-1"
                    v-model.trim="form.user.tel"
                    :rules="[rules.required, rules.phone]"
                    label="收件人電話"
                    placeholder="請輸入電話"
                    required
                    type="tel"
                  ></v-text-field>
                  <!-- Email -->
                  <v-text-field
                    class="font-weight-bold mb-1"
                    v-model.trim="form.user.email"
                    :rules="[rules.required, rules.email]"
                    label="Email"
                    placeholder="輸入 email"
                    required
                    type="email"
                  ></v-text-field>
                  <!-- 地址 -->
                  <v-text-field
                    class="font-weight-bold mb-1"
                    v-model.trim="form.user.address"
                    :rules="[rules.required]"
                    label="收件人地址"
                    placeholder="請輸入地址"
                    required
                  ></v-text-field>
                  <!-- 付款方式 -->
                  <v-select
                    class="font-weight-bold mb-1"
                    v-model="form.payment_method"
                    :items="paymentOptions"
                    label="付款方式"
                    placeholder="請選擇付款方式"
                    required
                  ></v-select>
                  <!-- 留言 -->
                  <v-textarea
                    class="font-weight-bold mb-1"
                    v-model.trim="form.message"
                    label="留言"
                    placeholder="輸入留言"
                    rows="5"
                  ></v-textarea>
                  <router-link to="/cart" class="mt-md-0 mt-3">
                    <v-btn class="back-to-cart btn btn-outline-dark"
                      ><v-icon>mdi-reply</v-icon>返回購物車</v-btn
                    >
                  </router-link>
                </v-col>
              </v-row>
              <div class="sent-from-btn">
                <button
                  v-if="isProcessing"
                  @click.prevent="createOrder"
                  class="m-checkout btn btn-outline-success mb-3"
                  :disabled="isProcessing"
                >
                  <i class="fas fa-spinner fa-spin" v-if="isProcessing"> </i>
                  <span>送出訂單</span>
                </button>
                <button
                  v-else
                  @click.prevent="createOrder"
                  class="m-checkout btn btn-outline-success mb-3"
                >
                  <span>送出訂單</span>
                </button>
                <router-link to="/cart" class="m-return btn btn-outline-dark">
                  <i class="fas fa-reply mr-2"></i>
                  返回購物車
                </router-link>
              </div>
            </v-container>
          </v-form>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="mx-2 my-4 order-total-box">
            <h3 class="font-weight-bold mb-3">訂單總計</h3>
            <div class="my-3" v-for="item in carts" :key="item.product.id + 1">
              <div class="d-flex">
                <img :src="item.product.imageUrl" alt="" class="mr-2" />
                <div class="w-100">
                  <div class="d-flex justify-content-between font-weight-bold">
                    <p class="mb-0">{{ item.product.title }}</p>
                    <p class="mb-0">x{{ item.qty }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <small class="mb-0 text-muted">
                      {{ $filters.currency(item.product.price) }} / {{ item.product.unit }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <table class="table total-table my-3 text-muted">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-3 font-weight-normal">小計</th>
                  <td class="text-right border-0 px-0 pt-3">
                    {{ $filters.currency(orgTotal) }}
                  </td>
                </tr>
                <tr v-if="coupon_status">
                  <th scope="row" class="border-0 px-0 pb-3 font-weight-bold text-orange">
                    優惠碼折扣
                  </th>
                  <td class="text-right text-orange font-weight-bold border-0 px-0 pb-3">
                    -{{ $filters.currency(orgTotal - Math.round(cartTotal)) }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="border-0 p-0 font-weight-normal">運費</th>
                  <td class="text-right border-0 p-0">
                    <div>
                      <span v-if="cartTotal > 599"> NT 0</span>
                      <span v-else> NT 60</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right border-0 px-0 pt-0 pb-4">
                    <div class="input-group mt-3 input-group-sm">
                      <input
                        type="text"
                        class="form-control m-coupon"
                        v-model.trim="coupon_code"
                        placeholder="請輸入優惠碼"
                      />
                      <div class="input-group-append">
                        <button class="btn coupon-btn" type="button" @click.prevent="addCoupon">
                          套用優惠碼
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-2 totalnum-box">
              <p class="total font-weight-bold" v-if="!coupon_status">總計</p>
              <p class="total font-weight-bold text-success" v-else>折扣價</p>
              <p class="total font-weight-bold" v-if="!coupon_status">
                <span v-if="orgTotal >= 599">
                  {{ $filters.currency(orgTotal) }}
                </span>
                <span v-else>
                  {{ $filters.currency(orgTotal + 60) }}
                </span>
              </p>
              <p class="total font-weight-bold text-success" v-else>
                <span v-if="cartTotal >= 599">{{ $filters.currency(cartTotal) }}</span>
                <span v-else>
                  {{ $filters.currency(cartTotal + 60) }}
                </span>
              </p>
              <p class="btn-send-order font-weight-bold">
                <button
                  v-if="isProcessing"
                  class="btn btn-send-order btn-sm"
                  @click="createOrder"
                  :disabled="isProcessing"
                >
                  <i class="fas fa-spinner fa-spin" v-if="isProcessing"> </i>
                  <span>送出訂單</span>
                </button>
                <button v-else class="btn btn-send-order btn-sm" @click.prevent="createOrder">
                  <span>送出訂單</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "@/alert/Toast";
import { auth, db } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      carts: {},
      orgTotal: 0,
      cartTotal: 0,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        payment_method: "WebATM",
        message: "",
      },
      coupon_status: false,
      coupon_code: "",
      final_total: 0,
      isLoading: false,
      isProcessing: false,
      isValid: false,
      shipFree: false,
      userInfo: [],
      member: {
        isMember: false,
        uid: "",
      },
      userCartItems: [],
      paymentOptions: ["WebATM", "Credit", "LinePay", "ApplePay", "GooglePay"],
      rules: {
        required: (value) => !!value || "此欄位為必填",
        email: (value) => /.+@.+\..+/.test(value) || "請輸入有效的 email 地址",
        phone: (value) => /^\d{10}$/.test(value) || "請輸入有效的電話號碼",
      },
    };
  },
  created() {
    this.getAuthState();
  },
  mounted() {
    this.$emitter.on("logout-user", () => {
      this.member.isMember = false;
      this.member.uid = "";
    });
  },
  beforeUnmount() {
    this.$emitter.off("logout-user", () => {});
  },
  methods: {
    async fetchUserData(uid, orderDoc, orderId) {
      const userRef = doc(db, "userInfo", uid);
      const docSnap = await getDoc(userRef);
      const orderDocSnap = await getDoc(orderDoc);
      // 獲取目前的 orders 數組
      const orders = docSnap.data().orders || [];
      // 獲取訂單數據並添加 orderId
      const orderData = orderDocSnap.data();
      orderData.orderId = orderId;
      // 將新的訂單資訊推到 orders 數组
      orders.push(orderData);
      // 更新 userInfo 文檔
      await updateDoc(userRef, {
        orders: orders,
      });
    },
    getAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.form.user.email = user.email;
          this.form.user.name = user.displayName;
          this.member.isMember = true;
          this.member.uid = user.uid;
          this.getUserInfo(user.uid);
          this.getCart(user.uid);
          Toast.fire({
            icon: "success",
            title: "成功帶入會員資訊",
          });
        } else {
          this.member.isMember = false;
          this.member.uid = "";
          Toast.fire({
            icon: "info",
            title: "登入會員可獲得更多資訊",
          });
        }
      });
    },
    async getUserInfo(uid) {
      const userRef = collection(db, "userInfo");
      const querySnapshot = await getDocs(userRef);
      this.userInfo = [];
      querySnapshot.forEach((doc) => {
        let appData = doc.data();
        appData.id = doc.id;
        this.userInfo.push({
          id: appData.id,
          address: appData.address,
          phoneNumber: appData.phoneNumber,
        });
      });
      this.userInfo.forEach((item) => {
        if (item.id === uid) {
          this.form.user.address = item.address;
          this.form.user.tel = item.phoneNumber;
        }
      });
    },
    async updateUserCartItem(item) {
      const userRef = collection(db, "userInfo");
      const userDocRef = doc(userRef, this.member.uid);
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
    // 取得購物車
    getCart(uid) {
      const url = `${process.env.VUE_APP_CUSTOM_API}cart/${uid}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((response) => {
          this.carts = response.data.data.carts;
          if (this.member.uid !== "") {
            this.updateUserCartItem(this.carts);
          }
          if (this.coupon_code === "" || this.coupon_status === false) {
            this.carts.forEach((item) => {
              if ("coupon" in item) {
                // 判斷coupon是否在item裡
                delete item.coupon; // 有的話刪除coupon
                item.final_total = item.total; // 把各項目的final_total改成原始的total
              }
            });
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
    },
    updateTotal() {
      let total = 0;
      this.orgTotal = 0;
      this.carts.forEach((item) => {
        if ("coupon" in item) {
          total += item.final_total;
          this.orgTotal += item.product.price * item.qty;
        } else {
          total += item.product.price * item.qty;
          this.orgTotal = total;
        }
      });
      this.cartTotal = total;
    },
    addCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_CUSTOM_API}cart/${this.member.uid}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.$http
        .post(url, { data: coupon })
        .then((res) => {
          if (res.data.success === true) {
            this.coupon_status = true;
            this.getCart(this.member.uid);
            this.isLoading = false;
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
          } else if (this.coupon_code === "") {
            this.isLoading = false;
            this.coupon_status = false;
            this.getCart(this.member.uid);
            Toast.fire({
              icon: "error",
              title: "優惠碼不能為空",
            });
          } else {
            this.isLoading = false;
            this.coupon_status = false;
            this.getCart(this.member.uid);
            Toast.fire({
              icon: "error",
              title: res.data.message,
            });
          }
        })
        .catch((err) => {
          const errorData = err.response.data.errors;
          if (errorData) {
            errorData.code.forEach((errmsg) => {
              Toast.fire({
                title: `${errmsg}`,
                icon: "error",
              });
            });
            this.isLoading = false;
          } else {
            const { message } = err.response.data;
            Toast.fire({
              title: `${message}`,
              icon: "error",
            });
            this.isLoading = false;
          }
        });
    },
    createOrder() {
      this.$refs.form.validate().then((res) => {
        if (res.valid === false) {
          Toast.fire({
            icon: "error",
            title: "請輸入正確資訊",
          });
        } else {
          this.isProcessing = true;
          this.isLoading = true;
          const url = `${process.env.VUE_APP_CUSTOM_API}order/${this.member.uid}`;
          const order = { ...this.form };
          this.$http
            .post(url, { data: order })
            .then((res) => {
              if (res.data.success === true) {
                this.$emitter.emit("update-total", this.member.uid); // 送出訂單後，更新購物車總數
                Toast.fire({
                  icon: "success",
                  title: "表單已送出",
                });

                this.getOrder(res.data.orderId)
                  .then((orderDataRes) => {
                    this.addOrderWithCustomId(res.data.orderId, orderDataRes.data.order.create_at);
                    setTimeout(() => {
                      this.$router.replace(`/checkout/${res.data.orderId}`);
                      this.getCart(this.member.uid);
                      this.isProcessing = false;
                      this.isLoading = false;
                      this.$refs.form.reset();
                    }, 1500);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }
            })
            .catch(() => {
              this.isProcessing = false;
              Toast.fire({
                title: "訂單失敗，請稍後再試",
                icon: "error",
              });
              this.isLoading = false;
            });
        }
      });
    },
    // 增加訂單的 orderid 到 order 集合
    async addOrderWithCustomId(orderId, create_at) {
      try {
        // 指定集合和文檔 ID
        const orderDoc = doc(db, "orderInfo", orderId);

        if (this.cartTotal < 599) {
          this.final_total = this.cartTotal + 60;
          this.shipFree = false;
        } else {
          this.final_total = this.cartTotal;
          this.shipFree = true;
        }
        // 添加文檔數據
        await setDoc(orderDoc, {
          cartTotal: Math.round(this.final_total),
          isCouponUsed: this.coupon_status,
          payment: this.form.payment_method,
          message: this.form.message,
          create_at: create_at,
          is_paid: false,
          is_member: this.member.isMember,
          is_shipfree: this.shipFree,
          uid: this.member.uid,
          user: this.form.user,
        });
        const cartSubCol = collection(orderDoc, "cartInfo");
        // 將每個項目加入到 cartInfo 子集合
        for (const [key, item] of Object.entries(this.carts)) {
          await setDoc(doc(cartSubCol, key), item);
        }
        this.fetchUserData(this.member.uid, orderDoc, orderId);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    async getOrder(orderId) {
      try {
        const url = `${process.env.VUE_APP_CUSTOM_API}order/${orderId}`;
        const res = await this.$http.get(url);
        return res;
      } catch (error) {
        console.error("Error fetching order:", error);
        throw error; // 可以返回一些預設值或者錯誤信息
      }
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-input__details) {
  display: initial !important;
}
</style>
