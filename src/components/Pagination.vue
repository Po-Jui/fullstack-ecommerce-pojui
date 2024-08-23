<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          @click.prevent="updatePage(pages.current_page - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          @click.prevent="updatePage(pages.current_page + 1)"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ["pages"],
  methods: {
    // 當點擊上一頁下一頁會觸發該事件，並帶入該頁碼
    // 由於父層已經把該頁碼傳遞過來，所以直接把該頁碼傳遞過來即可
    updatePage(page) {
      this.$emit("emit-pages", page);
    }
  }
};
</script>
