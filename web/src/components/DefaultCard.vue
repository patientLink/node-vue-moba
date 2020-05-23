<template>
  <div class="card px-3 pb-2" :class="{'bottom-border': bBorder}">
    <div :class="['card-header','d-flex','fs-xl', 'pt-3', 'pb-3', withBaseline ? 'card-header-with-baseline':'']">
      <i class="iconfont mr-2 fs-lg" :class="`icon-${icon}`"></i>
      <div class="card-header-title flex-1" :class="{'f-bold': textBold}">{{title}}</div>
      <i class="iconfont icon-more2" v-if="moreIcon"></i>
    </div>
    <div class="card-body">
      <slot></slot>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultCard',
  props: {
    title: { // title的内容
      type: String, 
      default: '标题',
      required: true 
      },
    icon: { // icon图标的样式
      type: String, 
      default: ''
    },
    withBaseline: { // 是否添加下划分隔线
      type: Boolean,
      default: false
    },
    moreIcon: { // more图标是否展示
      type: Boolean,
      default: true
    },
    textBold: { // title是否为加粗
      type: Boolean,
      default: false
    },
    bBorder: { // 是否添加下边框
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
  @import '~assets/scss/variables.scss';
  .card {
    background: map-get($map: $colors, $key: 'white');
  }
  .card-header {
    line-height: 1.5385rem;
    position: relative;
    &.card-header-with-baseline::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: map-get($map: $colors, $key: 'grey-2');
    }
  }
</style>