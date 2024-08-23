<template>
  <div>
    <Loading :active="isLoading">
      <i class="fas fa-spinner fa-spin fa-5x"></i>
    </Loading>
    <div>
      <button class="btn btn-success" @click="openCouponModal(true)">
        <i class="fas fa-plus"></i> 新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead class="table-dark">
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, item)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-pages="getCoupons"></Pagination>
    <couponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon" />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import CouponModal from "@/components/backend/CouponModal.vue";
import Toast from "@/alert/Toast";

export default {
  components: { CouponModal, Toast, Pagination },
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      pagination: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        code: "",
      },
      isLoading: false,
      isNew: false,
      token: document.cookie.replace(/(?:(?:^|.*;\s*)customToken\s*=\s*([^;]*).*$)|^.*$/, "$1"),
    };
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          is_enabled: 1,
          due_date: new Date().getTime() / 1000,
          percent: 100,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.showModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      this.$swal({
        title: "確定要刪除?",
        html: `是否刪除<b class="text-danger">${this.tempCoupon.title}</b>(刪除後將無法恢復)`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是, 確定刪除!",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.delCoupon();
        }
      });
    },
    getCoupons(page = 1) {
      this.isLoading = true;
      if (page > this.pagination.total_pages) {
        page = this.pagination.total_pages;
      }
      const url = `${process.env.VUE_APP_CUSTOM_API}admin/coupons/?page=${page}`;
      this.$http
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.coupons = response.data.coupons;
          this.pagination = response.data.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          Toast.fire({
            icon: "error",
            title: "您尚未登入，若要進行後台管理請重新登入!",
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 500);
        });
    },
    updateCoupon(tempCoupon) {
      if (this.isNew) {
        // const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        const url = `${process.env.VUE_APP_CUSTOM_API}admin/coupon`;
        this.$http
          .post(url, { data: tempCoupon }, { headers: { Authorization: `Bearer ${this.token}` } })
          .then((response) => {
            console.log(response, tempCoupon);
            if (response.data.success) {
              Toast.fire({
                icon: "success",
                title: "新增優惠券成功",
              });
              this.getCoupons();
            }
            this.$refs.couponModal.hideModal();
          })
          .catch((error) => {
            // error.response.data.message 重新format
            console.log(error.response.data.message);
            const replacements = {
              title: "標題",
              percent: "折扣百分比",
              code: "優惠碼",
              is_enabled: "是否啟用",
            };
            const replaceText = (messages) => {
              return messages.map((message) => {
                let updatedMessage = message;
                // 直接替換消息中的鍵和值
                for (const key in replacements) {
                  if (updatedMessage.includes(key)) {
                    updatedMessage = updatedMessage.replace(
                      new RegExp(key, "g"),
                      replacements[key]
                    );
                  }
                }
                return updatedMessage; // 返回更新後的消息
              });
            };
            let tempText = replaceText(error.response.data.message);
            let messagesTemp = [];
            tempText.forEach((item) => {
              item = item.trim();
              const [key, message] = item.split(" ");
              messagesTemp.push(`${key} ${message}`);
            });
            let result = messagesTemp.map((item) => `⚠️${item}<br/>`);
            result = result.join("");
            Toast.fire({
              icon: "error",
              title: "新增優惠券失敗",
              html: `<b class="text-danger">${result}</b>`,
            });
            this.$refs.couponModal.hideModal();
          });
      } else {
        const url = `${process.env.VUE_APP_CUSTOM_API}admin/coupon/${this.tempCoupon.id}`;
        this.$http
          .put(
            url,
            { data: this.tempCoupon },
            { headers: { Authorization: `Bearer ${this.token}` } }
          )
          .then((response) => {
            console.log(response);
            Toast.fire({
              icon: "success",
              title: "更新優惠券成功",
            });
            this.getCoupons();
            this.$refs.couponModal.hideModal();
          });
      }
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_CUSTOM_API}admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http
        .delete(url, { headers: { Authorization: `Bearer ${this.token}` } })
        .then((response) => {
          console.log(response, this.tempCoupon);
          this.getCoupons();
          Toast.fire({
            icon: "success",
            title: "刪除優惠券成功",
          });
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCoupons();
    this.$emitter.emit("check-navbar", "coupons");
  },
};
</script>
