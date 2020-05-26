<template>
  <div class="load-more fs-sm bg-white text-grey-4 text-center bottom-border" @click="loadHandler()">
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'LoadMore',
  props: {
    title: {
      type: String,
      default: '加载更多内容'
    }
  },
  methods: {
    loadHandler() {
      this.$emit('load-more')
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
  .load-more {
    height: 2.6923rem;
    line-height: 2.6923rem;
    position: relative;
    span {
      position: relative;
    }
    &.waiting span::before {
      position: absolute;
      content: "";
      display: block;
      width: 10px;
      height: 10px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border: 1px solid black;
    }
  }
</style>