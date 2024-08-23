<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3 class="inner-modal-title">◎ 用戶資料 ◎</h3>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 100px">姓名 :</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email :</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話 :</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址 :</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3 class="inner-modal-title">◎ 訂單細節 ◎</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號 :</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間 :</th>
                    <td>{{ $filters.date(tempOrder.create_at) }} {{ createDateDetail }}</td>
                  </tr>
                  <tr>
                    <th>付款時間 :</th>
                    <td>
                      <span v-if="tempOrder.paid_date !== '' && tempOrder.is_paid === true">
                        {{ $filters.date(tempOrder.paid_date) }} {{ paidDateDetail }}
                      </span>
                      <span v-else class="text-warning">時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態 :</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                      <span v-else class="text-danger">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>優惠券 :</th>
                    <td>
                      <strong v-if="tempOrder.isCouponUsed === true" class="text-success">{{
                        tempOrder.products[0].coupon.title
                      }}</strong>
                      <span v-else class="text-danger">無</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額 :</th>
                    <td>
                      {{ $filters.currency(tempOrder.cartTotal) }}
                    </td>
                  </tr>
                  <tr>
                    <th>留言 :</th>
                    <td>
                      {{ tempOrder.message }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 class="inner-modal-title">◎ 選購商品 ◎</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>● {{ item.product.title }}</th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">
                      {{ $filters.currency(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="$emit('update-order', tempOrder)"
          >
            確認
          </button>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from "@/mixins/modalMixin";

export default {
  name: "orderModal",
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      status: {},
      modal: "",
      tempOrder: {},
      isPaid: false,
      createDateDetail: "",
      paidDateDetail: "",
    };
  },
  mixins: [modalMixin],
  inject: ["emitter"],
  watch: {
    order() {
      this.tempOrder = this.order;
      this.isPaid = this.tempOrder.is_paid;
      this.createDateDetail = this.formatTimestamp(this.tempOrder.create_at);
      this.paidDateDetail = this.formatTimestamp(this.tempOrder.paid_date);
    },
  },
  methods: {
    formatTimestamp(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString();
    },
  },
};
</script>

<style lang="scss" scoped>
.inner-modal-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
