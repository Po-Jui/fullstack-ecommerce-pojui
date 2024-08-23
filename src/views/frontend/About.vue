<template>
  <div>
    <div class="about-banner position-relative">
      <div class="about-ban-tit" data-aos="zoom-in-left">
        <p class="top-text">點亮心靈的香氛蠟燭</p>
        <p>讓每一刻都充滿溫馨</p>
      </div>
      <div class="m-about-ban-tit" data-aos="zoom-in-left">
        <p>點亮心靈的香氛蠟燭</p>
        <p class="text-y">讓每一刻都充滿溫馨</p>
      </div>
    </div>
    <div class="container">
      <div class="row mx-0 about-content-box my-4 flex-nowrap">
        <div class="col-lg-6 col-md-12 p-0 position-relative">
          <div class="about-content-bg"></div>
          <div
            class="imgbox"
            style="
              background-image: url(https://images.unsplash.com/photo-1544489671-ce8b5a700c84?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
            "
          ></div>
        </div>
        <article class="col-lg-6 col-md-12 about-content">
          <p class="about-intro">
            我們的香氛蠟燭不僅僅是一種照明工具，更是心靈的伴侶。
            <span class="about-intro-inner-title">Belle journée</span>
            選用純天然植物精油，讓每一盞蠟燭都散發著迷人的香氣，帶來舒適與寧靜。
            我們致力於創造一個放鬆和愉悅的環境，無論是忙碌的一天結束後，還是與親朋好友共度的美好時光。
            我們的香氛蠟燭是您生活中不可或缺的小確幸，讓每一個瞬間都充滿溫暖與香氣。點亮我們的香氛蠟燭，點亮您的心靈世界。
          </p>
        </article>
      </div>
      <div class="m-about-box row">
        <article class="col-md-12 m-about-content">
          <div
            class="imgbox"
            style="
              background-image: url(https://images.unsplash.com/photo-1544489671-ce8b5a700c84?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
            "
          ></div>
          <p class="m-about-content" data-aos="zoom-in">
            我們的香氛蠟燭不僅僅是一種照明工具，更是心靈的伴侶。
            <span class="m-about-intro-inner-title">Belle journée</span>
            選用純天然植物精油，讓每一盞蠟燭都散發著迷人的香氣，帶來舒適與寧靜。
            我們致力於創造一個放鬆和愉悅的環境，無論是忙碌的一天結束後，還是與親朋好友共度的美好時光。
            我們的香氛蠟燭是您生活中不可或缺的小確幸，讓每一個瞬間都充滿溫暖與香氣。點亮我們的香氛蠟燭，點亮您的心靈世界。
          </p>
        </article>
      </div>
    </div>
    <div class="about-footer">
      <div class="text-center">
        <h2 class="mb-3">Belle journée</h2>
        <div class="font-weight-bold">
          <h3 class="mb-4">聯絡資訊</h3>
          <p>電話：07-1234567</p>
          <p>營業時間：10:00 - 21:00</p>
          <p>地址：高雄市岡山區捷安路 777 號</p>
        </div>
      </div>
    </div>
    <div class="m-about-footer">
      <div class="text-center">
        <h2 class="mb-3">Belle journée</h2>
        <div class="font-weight-bold">
          <h3 class="mb-4">聯絡資訊</h3>
          <p>電話：07-1234567</p>
          <p>營業時間：10:00 - 21:00</p>
          <p>地址：高雄市岡山區捷安路 777 號</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  created() {
    window.scrollTo(0, 0);
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
      if (this.scrollTop > 50) {
        $(".imgbox").addClass("active");
      } else {
        $(".imgbox").removeClass("active");
      }
    });
  },
};
</script>
