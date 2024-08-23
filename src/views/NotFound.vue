<template>
  <div class="not-found-bg">
    <v-container class="d-flex">
      <v-row>
        <v-col class="text-center mr-10">
          <v-img
            src="https://img.freepik.com/free-vector/monster-404-error-concept-illustration_114360-1879.jpg?w=740&t=st=1721849050~exp=1721849650~hmac=b3b4ad0957ea48f188a64a008e43cb4c770241bc89de6ca6b00c7ec7fbb540ff"
            class="not-found-img mx-auto mb-3 rounded-circle"
            contain
          ></v-img>
          <h2 class="not-found-headline mb-2">抱歉，找不到您要的頁面</h2>
          <p class="not-found-subheading mb-3">
            您所尋找的頁面<br />可能已經被移除、更改名稱，或暫時不可用。
          </p>
          <v-btn class="goHome btn btn-inline-primary" @click="goHome">返回首頁</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.not-found-img {
  width: 300px;
  height: 300px;
}
.not-found-bg {
  background-image: url("https://images.unsplash.com/photo-1669568625853-9a5ae8de190e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  height: 100vh;
}
.not-found-headline {
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.5);
  text-shadow: 2px 2px 4px #a6a6a6;
  font-size: 40px;
}
.not-found-subheading {
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.5);
  text-shadow: 2px 2px 4px #a6a6a6;
  font-size: 15.5px;
}

@media (max-width: 1290px) {
  .not-found-img {
    width: 280px;
    height: 280px;
  }
  .not-found-headline {
    font-size: 32px;
    margin-left: 10px;
  }
  .not-found-subheading {
    font-size: 15px;
    margin-left: 15px;
    margin-top: 10px;
  }
}
@media (max-width: 1250px) {
  .not-found-headline {
    font-size: 30px;
  }
  .not-found-subheading {
    font-size: 14.5px;
    margin-top: 10px;
  }
}
@media (max-width: 455px) {
  .not-found-img {
    margin-top: 10px;
    width: 250px;
    height: 250px;
  }
  .not-found-headline {
    margin-top: 20px;
    font-size: 26px;
  }
  .not-found-subheading {
    font-size: 12.5px;
  }
}
@media (max-width: 420px) {
  .not-found-img {
    margin-top: 10px;
    left: 15px;
    width: 230px;
    height: 230px;
  }
  .not-found-headline {
    margin-left: 30px;
    font-size: 22px;
  }
  .not-found-subheading {
    font-size: 11.5px;
    margin-top: 10px;
    margin-left: 30px;
  }
  .goHome {
    margin-left: 30px;
  }
}
</style>
