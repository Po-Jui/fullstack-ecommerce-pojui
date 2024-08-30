<template>
  <Loading :active="isLoading">
    <i class="fas fa-spinner fa-spin fa-5x"></i>
  </Loading>
  <table class="table mt-4">
    <thead class="table-dark">
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>訂單編號</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in ordersData" :key="key">
        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <span v-text="item.id" v-if="item"></span>
          </td>
          <td class="text-left">{{ $filters.currency(item.cartTotal) }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid"
                @change="updatePaid(item)"
              />
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid" class="text-success">已付款</span>
                <span v-else class="text-danger">未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                檢視
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelOrderModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :order="tempOrder" ref="orderModal" @update-order="updateOrder"></OrderModal>
  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
</template>

<script>
import OrderModal from "@/components/backend/OrderModal.vue";
import Pagination from "@/components/Pagination.vue";
import { db } from "@/methods/firebase";
import Toast from "@/alert/Toast";
import { collection, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1,
      ordersData: {}, // firebase 內的訂單數據
      token: document.cookie.replace(/(?:(?:^|.*;\s*)customToken\s*=\s*([^;]*).*$)|^.*$/, "$1"),
    };
  },
  components: {
    Pagination,
    OrderModal,
  },
  methods: {
    updateOrder(message) {
      console.log(message);
    },
    async getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${process.env.VUE_APP_CUSTOM_API}admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.$http
        .get(url, { headers: { Authorization: `Bearer ${this.token}` } })
        .then((response) => {
          this.orders = response.data.orders;
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
      try {
        const ordersCollectionRef = collection(db, "orderInfo");
        const ordersSnap = await getDocs(ordersCollectionRef);
        const orders = [];
        for (const orderDoc of ordersSnap.docs) {
          const orderData = { id: orderDoc.id, ...orderDoc.data() };
          // 獲取子集合的數據
          const subCollectionRef = collection(orderDoc.ref, "cartInfo");
          const subCollectionSnap = await getDocs(subCollectionRef);
          const subCollectionData = [];
          subCollectionSnap.forEach((subDoc) => {
            subCollectionData.push({ id: subDoc.id, ...subDoc.data() });
          });
          // 將子集合數據添加到訂單數據中
          orderData.products = subCollectionData;
          orders.push(orderData);
        }
        this.ordersData = orders;
        // 取得當前頁數，預設為第1頁
        let page = currentPage || 1;
        const pageSize = 10; // 每頁顯示的資料數量
        // 計算總資料數
        const totalOrders = this.ordersData.length;
        const totalPages = Math.ceil(totalOrders / pageSize);
        // 如果總資料數小於每頁顯示數量，則將頁數設為1
        if (totalOrders < pageSize) {
          page = 1;
          this.currentPage = page;
        }
        // 確保頁數不超過總頁數
        page = Math.max(1, Math.min(page, totalPages));
        // 計算當前頁面的起始和結束索引
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        // 將資料排序
        this.ordersData = this.ordersData.sort((a, b) => b.create_at - a.create_at);
        // 切分資料成當前頁面的資料
        const paginatedOrders = this.ordersData.slice(startIndex, endIndex);
        this.ordersData = paginatedOrders;
      } catch (error) {
        console.error("Error fetching orders with subcollections: ", error);
      }
    },
    openModal(isNew, item) {
      this.tempOrder = { ...item };
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item };
      this.$swal({
        title: "確定要刪除?",
        html: `是否刪除<b class="text-danger"></b>(刪除後將無法恢復)`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是, 確定刪除!",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal("已刪除!", "檔案已被刪除", "success");
          this.delOrder(item.id);
        }
      });
    },
    async updatePaid(item) {
      // ▼ 更新firebase的付款狀態 ▼
      const orderRef = doc(db, "orderInfo", item.id);
      let userRef = "";
      this.ordersData.forEach((order) => {
        if (order.id === item.id && order.is_member === true) {
          userRef = doc(db, "userInfo", order.uid);
        }
      });
      const userDocSnap = await getDoc(userRef);
      const userData = userDocSnap.data();
      if (userRef !== "") {
        userData.orders.forEach((order) => {
          if (order.orderId === item.id) {
            order.is_paid = item.is_paid;
            if (item.is_paid === false) {
              order.paid_date = "";
            }
          }
        });
        await updateDoc(userRef, {
          orders: userData.orders,
        });
      }
      if (item.is_paid === false) {
        await updateDoc(orderRef, {
          paid_date: "",
        });
      }
      await updateDoc(orderRef, {
        is_paid: item.is_paid,
      });
      // ▲ 更新firebase的付款狀態 ▲
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CUSTOM_API}admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http
        .put(api, { data: paid }, { headers: { Authorization: `Bearer ${this.token}` } })
        .then((response) => {
          this.isLoading = false;
          Toast.fire({
            icon: "success",
            title: "付款狀態已更新",
          });
          this.getOrders(this.currentPage);
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    async delOrder(orderId) {
      const url = `${process.env.VUE_APP_CUSTOM_API}admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      const orderdocRef = doc(db, "orderInfo", orderId);
      let userRef = "";
      this.ordersData.forEach((order) => {
        if (order.id === orderId && order.is_member === true) {
          userRef = doc(db, "userInfo", order.uid);
        }
      });
      const userDocSnap = await getDoc(userRef);
      const userData = userDocSnap.data().orders;
      userData.forEach((order) => {
        if (order.orderId === orderId) {
          userData.splice(userData.indexOf(order), 1);
        }
      });
      await updateDoc(userRef, {
        orders: userData,
      });

      // 取得要刪除的子集合引用
      const subCollectionRef = collection(orderdocRef, "cartInfo");

      // 取得子集合中的所有文件
      const subCollectionSnapshot = await getDocs(subCollectionRef);

      // 逐個刪除子集合中的文件
      subCollectionSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      await deleteDoc(orderdocRef);

      this.$http
        .delete(url, { headers: { Authorization: `Bearer ${this.token}` } })
        .then((response) => {
          this.getOrders(this.currentPage);
        });
    },
  },
  created() {
    this.getOrders();
    this.$emitter.emit("check-navbar", "orders");
  },
};
</script>
