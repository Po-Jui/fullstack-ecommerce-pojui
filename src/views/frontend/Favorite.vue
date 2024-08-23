<template>
  <div>
    <div class="follow-banner">
      <h2 class="text-center">追蹤商品</h2>
    </div>
    <div class="container follow-box">
      <div class="row">
        <div class="col-lg-8 col-md-12 mx-auto">
          <loading :active.sync="isLoading">
            <i class="loading-box"></i>
          </loading>
          <div class="follow-title">
            <h3>
              我的收藏
              <span v-if="followProduct.length > 0">( {{ followProduct.length }} )</span>
              <span v-else>( 0 )</span>
            </h3>
            <select
              v-if="followProduct.length > 0"
              name="sortData"
              id="sortData"
              v-model="sortData"
              class="form-control follow-sort mb-2"
              @change="sortProduct()"
            >
              <option value="" disabled>商品排序</option>
              <option value="highToLow">價格由高至低</option>
              <option value="lowToHigh">價格由低至高</option>
            </select>
          </div>
          <div class="mb-5" v-if="followProduct.length > 0">
            <div class="mb-3" v-for="item in followProduct" :key="item.id">
              <div class="followItem" data-aos="fade-right">
                <div class="d-flex">
                  <router-link :to="`/product/${item.id}`">
                    <img class="followItem-img" :src="item.imageUrl" alt="" />
                  </router-link>
                  <div class="followItem-content">
                    <h5>{{ item.title }}</h5>
                    <p>{{ item.content }}</p>
                    <p class="followItem-category">{{ item.category }}</p>
                  </div>
                </div>
                <div class="followItem-cart">
                  <span class="followItem-origin-price pl-3" v-if="item.origin_price !== 0">
                    {{ $filters.currency(item.origin_price) }} </span
                  ><br />
                  <span class="followItem-price pl-3">
                    {{ $filters.currency(item.price) }}
                  </span>
                  <span>
                    <button
                      v-if="status.loadingItem === item.id"
                      class="btn btn-shopping btn-sm"
                      type="button"
                      :disabled="status.loadingItem === item.id"
                      @click="addToCart(item.id)"
                    >
                      <i class="fas fa-spinner fa-spin"></i>
                      加到購物車
                    </button>
                    <button
                      v-else
                      class="btn btn-shopping btn-sm"
                      type="button"
                      @click="addToCart(item.id)"
                    >
                      加到購物車
                    </button>
                  </span>
                </div>

                <div class="m-followItem-cart">
                  <div class="m-fol-money">
                    <span class="m-folItem-origin-price pr-2" v-if="item.origin_price !== 0">
                      {{ $filters.currency(item.origin_price) }}
                    </span>
                    <span class="pr-2 m-folItem-price">
                      {{ $filters.currency(item.price) }}
                    </span>
                  </div>
                  <button
                    v-if="status.loadingItem === item.id"
                    class="btn btn-shopping btn-sm"
                    type="button"
                    :disabled="status.loadingItem === item.id"
                    @click="addToCart(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin"></i>
                    加到購物車
                  </button>
                  <button
                    v-else
                    class="btn btn-shopping btn-sm"
                    type="button"
                    @click="addToCart(item.id)"
                  >
                    加到購物車
                  </button>
                </div>
                <button href="#" class="follow-close" @click.prevent="delFollow(item.id)">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <!-- 分頁 -->
            <!-- <Pagination
              class="text-right"
              :pages="pagination"
              @emit-pages="getProducts"
              v-if="products.length >= 25"
            ></Pagination> -->
          </div>
          <div v-else class="my-5 no-follow">
            <p>目前沒有收藏任何商品唷！</p>
            <router-link to="/products" class="text-cyanine">
              <i class="fas fa-reply mr-2"></i>
              逛逛商品
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <section class="bg-follow-footer" v-if="!isLoading">
      <div class="container pt-4">
        <h4 class="font-weight-bold text-center h4">香氛蠟燭冷知識</h4>
        <div class="row mt-4 m-footer-follow">
          <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
            <div
              class="knowledge-img position-relative"
              style="
                background-image: url(https://images.unsplash.com/photo-1616968173950-4abf6a34c4b7?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
              "
            >
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">顏色與香味</h5>
                <p class="px-4 my-3">
                  蠟燭的顏色和香味可以對情緒產生影響。例如，藍色蠟燭常被認為有助於放鬆，而柑橘類香味可以提神醒腦。
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
            <div
              class="knowledge-img position-relative"
              style="
                background-image: url(https://images.unsplash.com/photo-1597318109735-d3612887d1ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
              "
            >
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">健康益處</h5>
                <p class="px-4 my-3">
                  一些香氛蠟燭含有精油，如薰衣草、迷迭香、桉樹等，這些精油有助於放鬆、減壓和改善睡眠品質。
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
            <div
              class="knowledge-img position-relative"
              style="
                background-image: url(https://images.unsplash.com/photo-1589536677029-c0aa1808fba6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
              "
            >
              <div class="knowledge-box">
                <h5 class="font-weight-bolder pt-3 pb-2 pl-4">香味釋放</h5>
                <p class="px-4 my-3">
                  香氛蠟燭的香味釋放來自於蠟燭燃燒時加熱的香精油。這些油在高溫下揮發，釋放出香味。
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
import Pagination from "@/components/Pagination.vue";
import { auth, db } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: "",
      },
      products: {},
      followProduct: {},
      sortData: "",
      followData: [],
      pagination: {},
      carts: {},
      uid: null,
    };
  },
  components: {
    Pagination,
  },
  created() {
    this.getAuthState();
    this.getProducts();
  },
  watch: {
    uid(newVal, oldVal) {
      if (newVal) {
        console.log("User is logged in with UID:", newVal);
        this.getProducts();
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
            this.updateUserCartItem();
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
      // console.log(item);
      const userRef = collection(db, "userInfo");
      const userDocRef = doc(userRef, this.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        this.userCartItems = docSnap.data().cartItem;
        if (item !== undefined) {
          const index = this.userCartItems.findIndex((i) => i.product.id === item.product.id);
          if (index !== -1) {
            this.userCartItems.splice(index, 1);
          }
          this.userCartItems.push(item);
          await updateDoc(userDocRef, {
            cartItem: this.userCartItems,
          });
        }
        console.log("userCartItems:", this.userCartItems);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    getProducts() {
      const url = `${process.env.VUE_APP_CUSTOM_API}products/all`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((response) => {
          this.products = response.data.products;
          if (this.uid !== null) {
            this.getFollow();
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        })
        .catch(() => {
          Toast.fire({
            title: "資料讀取失敗，請稍後再試",
            icon: "error",
          });
          this.isLoading = false;
        });
    },
    async getFollow() {
      const userRef = collection(db, "userInfo");
      const userDocRef = doc(userRef, this.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        this.followData = docSnap.data().favorite;
        console.log("followData:", this.followData);
      }
      this.followProduct = this.products.filter((item) => this.followData.indexOf(item.id) > -1);
    },
    addToCart(id) {
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_CUSTOM_API}cart/${this.uid}/add`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http
        .post(url, { data: cart })
        .then((response) => {
          this.updateUserCartItem(response.data.data);
          setTimeout(() => {
            this.status.loadingItem = "";
            this.$emitter.emit("update-total", this.uid); // 更新購物車數量
            Toast.fire({
              title: "已加入購物車",
              icon: "success",
            });
          }, 500);
        })
        .catch((err) => {
          this.status.loadingItem = "";
          Toast.fire({
            title: `${err.response.data.errors}`,
            icon: "warning",
          });
        });
    },
    async delFollow(id) {
      const followId = this.followData.indexOf(id);
      if (followId !== -1) {
        this.followData.splice(followId, 1);
        Toast.fire({
          title: "已取消收藏",
          icon: "success",
        });
        const userRef = collection(db, "userInfo");
        const userDocRef = doc(userRef, this.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          await updateDoc(userDocRef, {
            favorite: this.followData,
          });
        }
      }
      this.getProducts();
    },
    sortProduct() {
      this.followProduct.sort((a, b) => {
        if (this.sortData === "lowToHigh") {
          return a.price - b.price;
        }
        if (this.sortData === "highToLow") {
          return b.price - a.price;
        }
        return this.followProduct;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 1920px) {
  .col-lg-8 {
    width: 1050px !important;
  }
}
@media (max-width: 1200px) {
  .col-lg-8 {
    width: 975px !important;
  }
}
@media (max-width: 992px) {
  .container,
  .container-sm,
  .container-md,
  .container-lg {
    max-width: 900px;
  }
}
@media (max-width: 915px) {
  .col-lg-8 {
    width: 800px !important;
  }
}
@media (max-width: 830px) {
  .col-lg-8 {
    width: 750px !important;
  }
}
@media (max-width: 768px) {
  .col-lg-8 {
    width: 700px !important;
  }
}
</style>
