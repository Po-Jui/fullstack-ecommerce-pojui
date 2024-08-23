<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="filteredOrders"
      :items-per-page="5"
      class="elevation-1"
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
        <a @click.prevent="viewOrder(item)" class="order-Id">{{ item.orderId }}</a>
      </template>
      <template #item.cartTotal="{ item }">{{ $filters.currency(item.cartTotal) }}</template>
      <template #item.is_paid="{ item }">
        <span v-if="item.is_paid === true" class="text-success">已付款</span>
        <span v-else class="text-danger">未付款</span>
      </template>
    </v-data-table>
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
        { title: "訂單編號", key: "orderId", sortable: false },
        { title: "金額", key: "cartTotal" },
        { title: "付款方式", key: "payment", sortable: false },
        { title: "付款狀態", key: "is_paid", sortable: false },
        // { title: "訂單詳情", key: "actions", sortable: false },
      ],
      orders: [],
      localOrdersInfo: this.ordersInfo,
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
  },
  computed: {
    filteredOrders() {
      if (this.search === "") {
        return this.orders;
      }
      return this.orders.filter((order) => order.orderId.includes(this.search));
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
      console.log("查看訂單", item.orderId);
      this.$router.push(`/checkout/${item.orderId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-Id {
  color: #1976d2;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
