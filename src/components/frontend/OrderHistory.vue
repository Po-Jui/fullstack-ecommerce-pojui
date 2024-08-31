<template>
  <v-card class="table-order">
    <v-data-table
      :headers="headers"
      :items="filteredOrders"
      class="elevation-1"
      :items-per-page="5"
      :footer-props="{
        itemsPerPageOptions: [],
      }"
    >
      <template #top>
        <v-card-text>
          <v-text-field
            class="mx-4 mb-2"
            v-model="search"
            @input="onClick"
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="搜尋訂單編號"
            placeholder="輸入訂單編號"
            variant="solo"
            hide-details
            single-line
          ></v-text-field>
        </v-card-text>
      </template>
      <template #item.create_at="{ item }">{{ $filters.date(item.create_at) }}</template>
      <template #item.orderId="{ item }">
        <a v-if="item.is_paid === true" @click.prevent="viewOrder(item)" class="order-id">{{
          item.orderId
        }}</a>
        <a v-else @click.prevent="viewOrder(item)" class="order-id-no-pay">{{ item.orderId }}</a>
      </template>
      <template #item.cartTotal="{ item }">{{ $filters.currency(item.cartTotal) }}</template>
      <template #item.is_paid="{ item }">
        <span v-if="item.is_paid === true" class="text-success">已付款</span>
        <span v-else class="text-danger">未付款</span>
      </template>
    </v-data-table>
  </v-card>
  <v-card class="table-list mt-3">
    <v-row>
      <v-col cols="12">
        <v-text-field
          class="mt-3 mx-4 mb-2"
          v-model="search"
          @input="onClick"
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="搜尋訂單編號"
          placeholder="輸入訂單編號"
          variant="solo"
          hide-details
          single-line
        ></v-text-field>
      </v-col>
    </v-row>
    <v-card class="list-header ma-2" style="max-height: 200px; overflow-y: scroll">
      <v-card-text>
        <v-row no-gutters>
          <v-col :cols="dateCol">建立日期</v-col>
          <v-col :cols="orderCol" class="text-left">訂單編號 ( 點擊查看 )</v-col>
          <v-col v-show="!isSmallScreen" cols="2" class="text-left">付款狀態</v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-virtual-scroll :items="filteredOrders" height="320" item-height="48">
      <template v-slot:default="{ item }">
        <v-card class="ma-2">
          <v-card-text>
            <v-row no-gutters>
              <v-col :cols="dateCol">
                {{ $filters.date(item.create_at) }}
              </v-col>
              <v-col :cols="orderCol" class="text-left">
                <a v-if="item.is_paid === true" @click.prevent="viewOrder(item)" class="order-id">{{
                  item.orderId
                }}</a>
                <a v-else @click.prevent="viewOrder(item)" class="order-id-no-pay">{{
                  item.orderId
                }}</a>
              </v-col>
              <v-col v-show="!isSmallScreen" cols="2" class="text-left">
                <span v-if="item.is_paid === true" class="text-success">已付款</span>
                <span v-else class="text-danger">未付款</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
export default {
  name: "OrderHistory",
  props: {
    ordersInfo: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: "",
      loaded: false,
      loading: false,
      headers: [
        { title: "訂單日期", key: "create_at" },
        { title: "訂單編號 ( 點擊查看 )", key: "orderId", sortable: false },
        { title: "金額", key: "cartTotal" },
        { title: "付款方式", key: "payment", sortable: false },
        { title: "付款狀態", key: "is_paid", sortable: false },
        // { title: "訂單詳情", key: "actions", sortable: false },
      ],
      orders: [],
      localOrdersInfo: this.ordersInfo,
      isSmallScreen: false,
    };
  },
  watch: {
    ordersInfo: {
      immediate: true,
      handler(newValue) {
        if (Array.isArray(newValue)) {
          this.localOrdersInfo = newValue;
        } else {
          this.localOrdersInfo = [];
        }
      },
    },
  },
  mounted() {
    this.orders = [];
    this.localOrdersInfo.forEach((order) => {
      const orderstemp = {
        orderId: order.orderId,
        create_at: order.create_at,
        is_paid: order.is_paid,
        cartTotal: order.cartTotal,
        payment: order.payment,
      };

      this.orders.push(orderstemp);
      this.orders.sort((a, b) => b.create_at - a.create_at);
    });
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  computed: {
    filteredOrders() {
      if (this.search === "") {
        return this.orders;
      }
      return this.orders.filter((order) => order.orderId.includes(this.search));
    },
    dateCol() {
      return this.isSmallScreen ? 4 : 3;
    },
    orderCol() {
      return this.isSmallScreen ? 8 : 7;
    },
  },
  methods: {
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 1500);
    },
    viewOrder(item) {
      // 處理查看訂單的邏輯
      this.$router.push(`/checkout/${item.orderId}`);
    },
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth <= 500;
    },
  },
};
</script>

<style lang="scss" scoped>
.order-id {
  color: rgb(0, 180, 60);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.order-id-no-pay {
  color: rgb(215, 60, 60);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
:deep(.v-data-table-footer__items-per-page) {
  display: none;
}
/* 隱藏滾動條但保留空間 */
.v-card {
  .list-header {
    scrollbar-color: transparent transparent; /* 設置滾動條顏色為透明 */
  }
}
</style>
