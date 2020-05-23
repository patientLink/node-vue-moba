<template>
  <div class="card pl-3 pr-3 mt-3 pb-2">
    <div :class="['card-header','d-flex','fs-xl', 'pt-3', 'pb-3', withBaseline ? 'card-header-with-baseline':'']">
      <i class="iconfont mr-2 fs-lg" :class="`icon-${icon}`"></i>
      <div class="card-header-title  flex-1 ">{{title}}</div>
      <i class="iconfont icon-more2"></i>
    </div>
    <div class="card-body">
      <!-- 导航栏 -->
      <div class="nav bg-white d-flex jc-between ai-center">
        <span 
          v-for="(category, index) in categories" 
          class="h-100 px-2 d-flex jc-center ai-center"
          :key="index"
          @click="$refs.list.$swiper.slideTo(index)"
          >
          <span 
            class="nav-item pb-h mt-1 text-white"
            :class="`${index === currentIndex ? 'active' : ''}`"
            >
            {{category.name}}
          </span>
        </span>
      </div>
      <!-- 轮播图 -->
      <swiper 
        ref="list" 
        :options="{autoHeight: true}" 
        @slide-change="() => this.currentIndex = $refs.list.$swiper.realIndex">
        <swiper-slide 
          v-for="(category, i) in categories"
          :key="i"
          >
            <slot name="items" :category="category.newsList || category.heroList">
            </slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListCard',
  props: {
    title: { 
      type: String, 
      default: '标题',
      required: true 
      },
    icon: { 
      type: String, 
      default: ''
    },
    withBaseline: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  }
}
</script>

<style lang="scss">
  @import '~assets/scss/variables.scss';
  .card {
    background: map-get($map: $colors, $key: 'white');
    border-bottom: 1px solid map-get($map: $colors, $key: 'grey-2');
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