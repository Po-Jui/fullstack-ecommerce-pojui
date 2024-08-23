<template>
  <Loading :active="isLoading">
    <i class="fas fa-spinner fa-spin fa-5x"></i>
  </Loading>
  <div class="container-fluid p-0 top-spacing">
    <div>
      <button class="btn btn-success" @click="openModal(true)">
        <i class="fas fa-plus"></i> 新增產品
      </button>
    </div>
  </div>
  <table class="table mt-4 text-center">
    <thead class="table-dark text-center">
      <tr>
        <th width="120" class="text-start">分類</th>
        <th width="240" class="text-start">產品名稱</th>
        <th width="100" class="text-end">原價</th>
        <th width="100" class="text-end">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td class="text-start">{{ item.category }}</td>
        <td class="text-start">{{ item.title }}</td>
        <td class="text-right">
          <!-- 加入千分號 -->
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(item.price) }}
        </td>
        <td class="text-center">
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td class="text-center">
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>
</template>

<script>
import ProductModal from "@/components/backend/ProductModal.vue";
import Pagination from "@/components/Pagination.vue";
import Toast from "@/alert/Toast";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      token: document.cookie.replace(/(?:(?:^|.*;\s*)customToken\s*=\s*([^;]*).*$)|^.*$/, "$1"),
    };
  },
  components: {
    ProductModal,
    Pagination,
  },
  inject: ["emitter"],
  methods: {
    getProducts(page = 1) {
      if (page > this.pagination.total_pages) {
        page = this.pagination.total_pages;
      }
      const api = `${process.env.VUE_APP_CUSTOM_API}admin/products/?page=${page}`;
      this.isLoading = true;
      if (this.token !== "") {
        this.$http
          .get(api, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((res) => {
            this.isLoading = false;
            if (res.data.success) {
              this.products = res.data.products;
              this.pagination = res.data.pagination;
              console.log(this.pagination);
            }
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
      }
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_CUSTOM_API}admin/product`;
      let httpMethod = "post";
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_CUSTOM_API}admin/product/${item.id}`;
        httpMethod = "put";
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](
        api,
        { data: this.tempProduct },
        { headers: { Authorization: `Bearer ${this.token}` } }
      )
        .then((response) => {
          productComponent.hideModal();
          if (response.data.success) {
            this.getProducts();
            Toast.fire({
              title: "更新成功",
              icon: "success",
            });
          }
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          // error.response.data.message 重新format
          const replacements = {
            title: "標題",
            category: "分類",
            unit: "單位",
            origin_price: "原價",
            price: "售價",
          };
          const replaceText = (messages) => {
            return messages.map((message) => {
              let updatedMessage = message;
              // 直接替換消息中的鍵和值
              for (const key in replacements) {
                if (updatedMessage.includes(key)) {
                  updatedMessage = updatedMessage.replace(new RegExp(key, "g"), replacements[key]);
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
          productComponent.hideModal();
          Toast.fire({
            title: "🔔更新失敗，請稍後再試🔔",
            // text: messagesTemp,
            html: `<b class="text-danger">${result}</b>`,
            icon: "error",
          });
        });
    },
    // 開啟刪除 Modal
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      this.$swal({
        title: "確定要刪除?",
        html: `是否刪除<b class="text-danger">${this.tempProduct.title}</b>(刪除後將無法恢復)`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是, 確定刪除!",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.delProduct();
          this.$swal("已刪除!", "檔案已被刪除", "success");
        }
      });
    },
    delProduct() {
      const api = `${process.env.VUE_APP_CUSTOM_API}admin/product/${this.tempProduct.id}`;
      this.$http
        .delete(api, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(() => {
          this.getProducts();
        })
        .catch((error) => {
          this.$swal("刪除失敗", "請稍後再試", "error");
        });
    },
  },
  created() {
    this.getProducts();
    this.$emitter.emit("check-navbar", "products");
  },
};
</script>
