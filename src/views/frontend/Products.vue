<template>
  <div>
    <div class="products-banner">
      <h2 class="text-center" v-if="filterType === ''">全部商品</h2>
      <h2 class="text-center" v-else>{{ filterType }}</h2>
    </div>
    <div class="container">
      <loading :active.sync="isLoading">
        <i class="loading-box"></i>
      </loading>
      <div class="row rwd-product-box">
        <nav class="col-md-3 pr-md-0">
          <ul class="list-group sticky-top">
            <div class="dropdown">
              <v-select class="select" v-model="filterType" label="商品分類" :items="category">
                <v-menu>
                  <v-list>
                    <v-list-item v-for="item in category" :key="item">
                      <v-list-item-title @click.prevent="filterType = item">{{
                        item
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-select>
            </div>
            <li class="list-group-item p-xy-0 des-list-group" v-for="item in category" :key="item">
              <a
                data-toggle="tab"
                href="#"
                class="list-btn"
                @click.prevent="filterType = item"
                :class="{ active: item === filterType }"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="col-md-9 position-relative">
          <div class="sortData-box-product">
            <span>{{ getFilter.length }} 個商品</span>
            <select
              name="sortData"
              id="sortData"
              v-model="sortData"
              class="form-control sortData-product mb-3"
              @change="sortProducts()"
            >
              <option value="" disabled>商品排序</option>
              <option value="highToLow">價格由高至低</option>
              <option value="lowToHigh">價格由低至高</option>
            </select>
            <span class="icon"><i class="fas fa-sort"></i></span>
          </div>
          <div class="d-flex flex-wrap m-card-ground">
            <div class="card-flex shadow-sm" v-for="item in getFilter" :key="item.id">
              <div class="item-img" :style="{ backgroundImage: `url(${item.imageUrl})` }">
                <router-link :to="`/product/${item.id}`" class="btn card-btn-box btn-sm">
                  查看更多
                </router-link>
                <div
                  title="收藏"
                  class="icon-tags"
                  @click.prevent="addFollow(item.id)"
                  v-if="followData.indexOf(item.id) === -1"
                >
                  <i class="far fa-bookmark"></i>
                </div>
                <div title="收藏" class="icon-tags" @click.prevent="addFollow(item.id)" v-else>
                  <i class="fas fa-bookmark"></i>
                </div>
              </div>
              <div class="position-relative">
                <h5 class="text-center card-title font-weight-bold">
                  {{ item.title }}
                </h5>
              </div>
              <div class="d-flex flex-column position-relative">
                <div class="text-center price-box">
                  <span class="origin-price-f mr-2" v-if="item.origin_price !== 0">{{
                    $filters.currency(item.origin_price)
                  }}</span>
                  <span class="price-color">{{ $filters.currency(item.price) }}</span>
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
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
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
      category: ["全部商品", "香氛蠟燭", "擴香", "精油", "其他"],
      isActive: false,
      filterType: "",
      products: {},
      sortData: "",
      followData: [],
      pagination: {},
      carts: {},
      userCartItems: [],
      uid: null,
    };
  },
  components: {
    Pagination,
  },
  created() {
    this.getAuthState();
    this.getProducts();
    if (this.category.length > 0) {
      this.filterType = this.category[0];
    }
  },
  methods: {
    getAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.emailVerified) {
            this.uid = user.uid;
            this.updateUserCartItem();
          }
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
          const index = this.userCartItems.findIndex((i) => i.product.id === item.product.id);
          if (index !== -1) {
            this.userCartItems.splice(index, 1);
          }
          this.userCartItems.push(item);
          await updateDoc(userDocRef, {
            cartItem: this.userCartItems,
          });
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    // 取得產品列表
    getProducts() {
      const url = `${process.env.VUE_APP_CUSTOM_API}products/all`;
      this.isLoading = true;
      setTimeout(() => {
        this.$http
          .get(url)
          .then((response) => {
            this.products = response.data.products;
            if (this.uid !== null) {
              this.getFollow();
            }
            const { categoryName } = this.$route.params;
            if (categoryName) {
              this.filterType = categoryName;
            }
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
    async getFollow() {
      const userRef = collection(db, "userInfo");
      const userDocRef = doc(userRef, this.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        this.followData = docSnap.data().favorite;
      }
    },
    scrollTitle() {
      if (this.filterType === "" || this.filterType === "熱門商品") {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        0
      );
    },
    sortProducts() {
      this.products.sort((a, b) => {
        if (this.sortData === "lowToHigh") {
          return a.price - b.price;
        }
        if (this.sortData === "highToLow") {
          return b.price - a.price;
        }
        return this.products;
      });
    },
    addToCart(id) {
      if (this.uid !== null) {
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
      } else {
        Toast.fire({
          title: "請先登入會員",
          icon: "warning",
        });
        this.$router.push("/userlogin");
      }
    },
    async addFollow(id) {
      if (this.uid !== null) {
        const followId = this.followData.indexOf(id);
        const userRef = collection(db, "userInfo");
        const userDocRef = doc(userRef, this.uid);
        if (followId === -1) {
          this.followData.push(id);
          await updateDoc(userDocRef, {
            favorite: this.followData,
          });
          Toast.fire({
            title: "已加入收藏",
            icon: "success",
          });
        } else {
          this.followData.splice(followId, 1);
          await updateDoc(userDocRef, {
            favorite: this.followData,
          });
          Toast.fire({
            title: "已取消收藏",
            icon: "success",
          });
        }
      } else {
        Toast.fire({
          title: "請先登入會員",
          icon: "warning",
        });
        this.$router.push("/userlogin");
      }
    },
  },
  computed: {
    getFilter() {
      let filterData = [];
      switch (this.filterType) {
        case "香氛蠟燭":
          filterData = this.products.filter((item) => item.category == "Fragrance");
          this.scrollTitle();
          break;
        case "擴香":
          filterData = this.products.filter((item) => item.category == "AromaStickDiffuser");
          this.scrollTitle();
          break;
        case "精油":
          filterData = this.products.filter((item) => item.category === "FragranceOil");
          this.scrollTitle();
          break;
        case "其他":
          filterData = this.products.filter((item) => item.category === "Other");
          this.scrollTitle();
          break;
        default:
          filterData = this.products;
          this.scrollTitle();
          break;
      }
      return filterData;
    },
  },
};
</script>
