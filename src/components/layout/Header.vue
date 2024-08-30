<template>
  <header class="header-navbar">
    <nav class="container d-flex justify-content-between">
      <div class="moblie-menu" id="moblie-menu" @click.prevent="openMenu">
        <i class="fas fa-bars"></i>
      </div>
      <div class="aside position-relative">
        <div class="m-menu-sidebar" @click.prevent="closeMenu"></div>
        <aside>
          <div class="m-menu-box">
            <router-link to="/userlogin" class="m-user" v-if="!isLogin">
              <i class="fa-solid fa-user ml-1 mt-3 fa-2x"></i>
              <span class="ml-3">未登入</span>
            </router-link>
            <router-link to="/userlogin" class="m-user mb-3" v-else>
              <img :src="member.image ? member.image : noUserPhoto" alt="" class="mr-2" />
              {{ truncate(displayName) }} 您好
            </router-link>
            <a href="#" class="m-close" id="m-close" @click.prevent="closeMenu">
              <i class="fas fa-times"></i>
            </a>
            <ul class="m-menu">
              <li>
                <router-link to="/">首頁</router-link>
              </li>
              <li>
                <router-link to="/products">商品列表</router-link>
              </li>
              <li>
                <router-link to="/about">關於我們</router-link>
              </li>
              <li>
                <router-link to="/favorite">收藏商品</router-link>
              </li>
              <li>
                <router-link to="/cart">
                  購物車
                  <span
                    v-if="isLogin"
                    class="m-cart float-right badge badge-danger mt-1"
                    style="font-size: 12px"
                  >
                    {{ cart }}
                  </span>
                </router-link>
              </li>
              <li v-if="isLogin" class="mt-3">
                <v-btn @click="logout" variant="text" color="error" rounded> 登出 </v-btn>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <div class="logo">
        <router-link to="/">
          <div class="d-flex align-items-center">
            <v-list-item :prepend-avatar="logo">
              <v-list-item-title>{{ logoName }}</v-list-item-title>
              <v-list-item-subtitle class="text-secondary text-center"
                >Candle Studio</v-list-item-subtitle
              >
            </v-list-item>
          </div>
        </router-link>
      </div>
      <div class="front-menu">
        <ul class="navbar-nav flex-row">
          <li>
            <router-link to="/">首頁</router-link>
          </li>
          <li>
            <router-link to="/products">商品列表</router-link>
          </li>
          <li>
            <router-link to="/about">關於我們</router-link>
          </li>
        </ul>
      </div>
      <div class="front-login position-relative">
        <router-link to="/favorite">
          <i class="far fa-bookmark"></i>
        </router-link>
        <router-link to="/cart">
          <i class="fas fa-shopping-cart"></i>
          <span class="badge badge-danger" v-if="isLogin">
            {{ cart }}
          </span>
        </router-link>
        <router-link to="/userlogin" class="user" v-tooltip:bottom="`未登入`" v-if="!isLogin">
          <i class="fa-solid fa-user mt-3"></i>
        </router-link>
        <v-menu
          class="user"
          v-else
          transition="slide-y-transition"
          open-on-hover
          :close-on-content-click="false"
        >
          <template #activator="{ props }">
            <v-btn icon="mdi-account" :="props"> </v-btn>
          </template>
          <v-card min-width="220">
            <v-card-text>
              <div class="d-flex flex-column align-center text-center mx-auto">
                <v-list-item :prepend-avatar="member.image ? member.image : noUserPhoto" rounded>
                </v-list-item>
                <v-list-item subtitle="" :title="`${truncate(displayName)}您好`"></v-list-item>
                <p class="text-caption mt-1">
                  {{ truncateEmail(user.email) }}
                </p>
              </div>
              <div class="mx-auto text-center">
                <v-divider class="my-3"></v-divider>
                <router-link to="/userlogin"
                  ><v-btn variant="text" color="success" rounded> 會員中心 </v-btn></router-link
                >
                <v-divider class="my-3"></v-divider>
                <v-btn @click="logout" variant="text" color="error" rounded> 登出 </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </nav>
  </header>
</template>

<script>
/* global $ */
import logo from "@/assets/belle.jpg";
import { auth, db } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      logo,
      noUserPhoto: "https://www.iconpacks.net/icons/2/free-user-camera-icon-3355-thumb.png",
      isLogin: false,
      logoName: "Belle journée",
      cart: 0,
      displayName: "",
      userInfo: [],
      member: {
        address: "",
        phoneNumber: "",
        image: null,
      },
      user: {
        email: "",
      },
    };
  },
  created() {
    this.$emitter.on("update-total", (uid) => {
      this.getCart(uid);
    });
    this.$emitter.on("update-user-status", () => {
      this.getAuthState();
    });
    this.$emitter.on("update-user-login-photo", (data) => {
      this.member.image = data.image;
      this.displayName = data.name;
    });
    this.getAuthState();
  },
  beforeUnmount() {
    this.$emitter.off("update-total", (uid) => {
      this.getCart(uid);
    });
    this.$emitter.off("update-user-status", () => {
      this.getAuthState();
    });
    this.$emitter.off("update-user-login-photo", () => {});
  },
  methods: {
    // 將字串截斷成指定長度
    truncate(value) {
      return value.length > 10 ? value.substring(0, 10) + "..." : value;
    },
    truncateEmail(value) {
      return value.length > 25 ? value.substring(0, 25) + "..." : value;
    },

    getAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.emailVerified) {
            this.getCart(user.uid);
            this.isLogin = true;
            this.displayName = user.displayName;
            this.user.email = user.email;
            this.getUserInfo(user.uid);
          }
        } else {
          this.isLogin = false;
        }
      });
    },
    async getUserInfo(uid) {
      const userRef = collection(db, "userInfo");
      // 獲得集合中的所有文件
      const querySnapshot = await getDocs(userRef);
      this.userInfo = [];
      querySnapshot.forEach((doc) => {
        let appData = doc.data();
        appData.id = doc.id;
        this.userInfo.push({
          id: appData.id,
          address: appData.address,
          phoneNumber: appData.phoneNumber,
          photoURL: appData.photoURL,
        });
      });
      this.userInfo.forEach((item) => {
        if (item.id === uid) {
          this.member.image = item.photoURL;
        }
      });
    },
    // 登出
    logout() {
      this.$swal({
        title: "確定要登出嗎?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是",
        cancelButtonText: "否",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emitter.emit("logout-user"); // 更新登入狀態
        }
      });
    },
    getCart(uid) {
      const url = `${process.env.VUE_APP_CUSTOM_API}cart/${uid}`;
      this.$http.get(url).then((response) => {
        this.cart = response.data.data.carts.length;
      });
    },
    openMenu() {
      $("body").addClass("open");
      $(".m-menu-sidebar").addClass("active");
    },
    closeMenu() {
      $("body").removeClass("open");
      $(".m-menu-sidebar").removeClass("active");
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
      if (this.scrollTop > 0) {
        $(".header-navbar").addClass("active");
      } else {
        $(".header-navbar").removeClass("active");
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.v-list-item-title {
  font-size: 21px !important;
  padding: 0 0 px;
}
</style>
