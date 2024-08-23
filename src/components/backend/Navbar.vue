<template>
  <v-app-bar app dark>
    <v-toolbar-title class="logo d-flex align-center">
      <v-list-item :prepend-avatar="logo" class="d-flex align-items-center">
        <v-list-item-title>Belle journée</v-list-item-title>
        <v-list-item-subtitle class="text-secondary text-center">
          Candle Studio
        </v-list-item-subtitle>
      </v-list-item>
    </v-toolbar-title>
    <v-toolbar-items>
      <!-- <v-btn icon>
        <v-icon>mdi-bell</v-icon>
        <v-tooltip activator="parent" location="bottom">通知</v-tooltip>
      </v-btn> -->
      <v-menu offset-y :close-on-content-click="false" v-model="menu">
        <template #activator="{ props }">
          <v-btn :="props" class="text-none" stacked>
            <v-badge color="error" content="2">
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list min-width="220" class="text-center">
          <v-list-item @click="menuItemSelected('通知 1')">
            <v-list-item-title>通知 1</v-list-item-title>
          </v-list-item>
          <v-list-item @click="menuItemSelected('通知 2')">
            <v-list-item-title>通知 2</v-list-item-title>
          </v-list-item>
          <v-list-item @click="menuItemSelected('通知 3')">
            <v-list-item-title>通知 3</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
        <v-tooltip activator="parent" location="bottom">管理員</v-tooltip>
      </v-btn>
      <v-btn icon @click.prevent="logout">
        <v-icon>mdi-export</v-icon>
        <v-tooltip activator="parent" location="bottom">登出</v-tooltip>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
  <v-navigation-drawer
    image="https://st4.depositphotos.com/13349494/22978/i/600/depositphotos_229787416-stock-photo-abstract-splash-grey-paint-black.jpg"
    theme="dark"
    permanent
    app
  >
    <v-list nav>
      <router-link v-for="item in items" :to="item.route">
        <v-list-item
          :prepend-icon="item.icon"
          :key="item.value"
          :class="{
            'v-list-item--active': activeItem === item.value,
            'custom-active-color': activeItem === item.value,
          }"
          @click="setActive(item.value)"
          class="nav-link text-white"
          rounded="shaped"
        >
          {{ item.title }}
        </v-list-item>
      </router-link>
    </v-list>
    <template #append>
      <div class="pa-2">
        <v-btn block color="error" @click.prevent="logout">
          <v-icon>mdi-export</v-icon>
          <span class="ml-2">登出</span>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import logo from "@/assets/belle.jpg";
import Toast from "@/alert/Toast";
export default {
  data() {
    return {
      logo,
      menu: false,
      activeItem: "",
      items: [
        { title: "產品", value: "products", route: "/dashboard/products", icon: "mdi-file" },
        { title: "訂單", value: "orders", route: "/dashboard/orders", icon: "mdi-list-status" },
        { title: "優惠券", value: "coupons", route: "/dashboard/coupons", icon: "mdi-ticket" },
      ],
    };
  },
  created() {
    this.$emitter.on("check-navbar", (value) => {
      this.activeItem = value;
    });
  },
  methods: {
    setActive(value) {
      this.activeItem = value;
    },
    menuItemSelected(item) {
      console.log("Selected:", item);
      this.menu = false;
    },
    logout() {
      this.$swal({
        title: "確定要登出嗎?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是",
        cancelButtonText: "否",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)customToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          );
          // console.log(token);
          if (token !== "") {
            const api = `${process.env.VUE_APP_CUSTOM_API}admin/logout`;
            this.$http
              .post(api, null, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                if (res.data.success) {
                  this.$swal("您已登出!", "若要進行後台管理請重新登入", "success");
                  this.$router.push("/login");
                }
              });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  letter-spacing: 1px;
  font-size: 28px;
  font-family: "Chewy", cursive;
  font-weight: 400;
  text-decoration: none;
  // margin-left: 90px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.custom-active-color {
  color: #d29e19 !important;
}
</style>
