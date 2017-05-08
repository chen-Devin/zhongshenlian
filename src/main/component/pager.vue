<template>
  <nav class="clearfix">
    <ul class="pagination pull-right" @click="onPagerClick">
      <li v-if="currentPage !== 1">
        <a class="more laquo">&laquo;</a>
      </li>
      <li class="disabled" v-if="currentPage === 1">
        <span>&laquo;</span>
      </li>
      <li :class="{ active: currentPage === 1 }"
          v-if="pageCount > 0">
        <a class="number">1</a>
      </li>
      <li v-if="showPrevMore">
        <a class="more quickprev">...</a>
      </li>
      <li :class="{ active: currentPage === PAGER }"
          v-for="(PAGER, index) in pagers"
          :key="PAGER">
        <a class="number">{{ PAGER }}</a>
      </li>
      <li v-if="showNextMore">
        <a class="more quicknext">...</a>
      </li>
      <li :class="{ active: currentPage === pageCount }"
          v-if="pageCount > 1">
        <a class="number">{{ pageCount }}</a>
      </li>
      <li v-if="currentPage !== pageCount">
        <a class="more raquo">&raquo;</a>
      </li>
      <li class="disabled" v-if="currentPage === pageCount">
        <span>&raquo;</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pager',
  data() {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false
    };
  },
  computed: {
    pagers() {
      const pagerCount = 7;
      const currentPage = Number(this.currentPage);
      const pageCount = Number(this.pageCount);
      let showPrevMore = false;
      let showNextMore = false;
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - 2) {
          showPrevMore = true;
        }
        if (currentPage < pageCount - 2) {
          showNextMore = true;
        }
      }
      const array = [];
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }
      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      return array;
    }
  },
  props: ['currentPage', 'pageCount'],
  methods: {
    onPagerClick(event) {
      const target = event.target;
      if (target.tagName === 'UL') {
        return;
      }
      let newPage = Number(event.target.textContent);
      const pageCount = this.pageCount;
      const currentPage = this.currentPage;
      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - 5;
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + 5;
        } else if (target.className.indexOf('laquo') !== -1) {
          newPage = currentPage - 1;
        } else if (target.className.indexOf('raquo') !== -1) {
          newPage = currentPage + 1;
        }
      }
      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }
        if (newPage > pageCount) {
          newPage = pageCount;
        }
      } else {
        return;
      }
      if (newPage !== currentPage) {
        console.log(newPage);
        this.$emit('change', newPage);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
nav {
  .pagination {
    a {
      cursor: pointer;
    }
  }
}
</style>
