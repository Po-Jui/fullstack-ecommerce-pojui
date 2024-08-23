<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <v-form ref="form" v-model="formValid">
            <v-text-field
              class="mb-1"
              v-model="tempCoupon.title"
              :rules="[rules.required]"
              label="標題"
              placeholder="請輸入標題"
              required
            ></v-text-field>

            <v-text-field
              class="mb-1"
              v-model="tempCoupon.code"
              :rules="[rules.required]"
              label="優惠碼"
              placeholder="請輸入優惠碼"
              required
            ></v-text-field>

            <v-text-field
              class="mb-1"
              v-model="due_date"
              :rules="[rules.required]"
              label="到期日"
              type="date"
              :min="minDate"
              required
            >
            </v-text-field>

            <v-text-field
              v-model.number="tempCoupon.percent"
              :rules="[rules.required, rules.twoDigits]"
              label="折扣百分比"
              placeholder="請輸入折扣百分比"
              type="number"
              min="10"
              max="99"
              maxlength="2"
              required
            ></v-text-field>

            <v-checkbox
              v-model="tempCoupon.is_enabled"
              :true-value="1"
              :false-value="0"
              label="是否啟用"
            ></v-checkbox>
          </v-form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!formValid"
            @click="$emit('update-coupon', tempCoupon)"
          >
            更新優惠券
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from "@/mixins/modalMixin";

export default {
  name: "couponModal",
  props: {
    coupon: {},
  },
  data() {
    return {
      tempCoupon: {},
      due_date: "",
      formValid: false,
      rules: {
        required: (value) => !!value || "此欄位為必填",
        twoDigits: (v) => (v >= 10 && v <= 99) || "折扣百分比必須為兩位數字且介於 10 ~ 99",
      },
      minDate: new Date().toISOString().substr(0, 10),
    };
  },
  emits: ["update-coupon"],
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      // 將時間格式改為 YYYY-MM-DD
      console.log(this.tempCoupon.due_date);
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split("T");
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  mixins: [modalMixin],
};
</script>

<style lang="scss" scoped>
:deep(.v-input__details) {
  display: initial !important;
}
</style>
