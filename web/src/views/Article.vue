<template>
  <div class="page-article pb-5">
    <div class="article-header d-flex ai-center mb-3 py-3 px-2 fs-md text-info-1">
      <i class="iconfont icon-back"></i>
      <div class="flex-1 f-bold text-ellipsis">
        {{model.title}}
      </div>
      <div class="text-grey fs-xs ml-4">2020-05-20</div>
    </div>
    <div v-html="model.body" class="article-body mb-4 px-4">
    </div>
    <div class="article-footer">
      <div class="article-footer-title d-flex ai-center px-4">
        <i class="iconfont icon-xiangguan mr-2 fs-xxxl text-dark-2"></i>
        <div class="f-bold fs-lg text-info-1">相关资讯</div>
      </div>
      <div class="article-footer-body pl-4 pr-2">
        <router-link 
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
          class="d-flex ai-center py-1"
          >
          <div class="flex-1 text-ellipsis fs-lg">{{item.title}}</div>
          <div class="text-grey fs-sm ml-5">2020-05-21</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    id: {required: true}
  },
  data() {
    return {
      model: {}
    }
  },
  watch: {
    id() {
      this.fetch()
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';

  .page-article {

    .article-header {
      border-bottom: 1px solid map-get($map: $colors, $key: 'grey-3');
    }

    .article-body {
      
      img {
        max-width: 100%;
        height: auto;
      }
      // 内嵌视频
      iframe {
        width: 100%;
        height: auto;
      }
    }

    .article-footer {
      .article-footer-title {
        height: 2.9231rem;
      }
      
    }
  }
  
</style>