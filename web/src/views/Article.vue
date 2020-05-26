<template>
  <div class="page-article pb-5">
    <div class="article-header d-flex ai-center mb-3 py-3 px-2 fs-md text-info-1">
      <i class="iconfont icon-back" @click="backHandler"></i>
      <div class="flex-1 f-bold text-ellipsis">
        {{model.title}}
      </div>
      <div class="text-grey fs-xs ml-4">{{model.createdAt | date}}</div>
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
          :to="`/articles/${flag ? item._id+'+' : item._id}`"
          v-for="item in model.related"
          :key="item._id"
          class="d-flex ai-center py-1"
          >
          <div class="flex-1 text-ellipsis fs-lg">{{item.title}}</div>
          <div class="text-grey fs-sm ml-5">{{item.createdAt | date}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Article',
  props: {
    id: {required: true}
  },
  computed: {
    // realId() {
    //   if(this.id.indexOf('+') === '-1') {
    //     return this.id
    //   }else{
    //     return 
    //   }
    // }
  },
  data() {
    return {
      model: {},
      flag: false
    }
  },
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  watch: {
    id() {
      this.fetch()
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`${this.flag ? 'intros':'articles'}/${this.flag ? this.id.slice(0,this.id.length-1) : this.id}`)
      this.model = res.data
    },
    backHandler() {
      if(window.history.length > 1) {
        this.$router.back()
      }
    },
    checkFlag() {
      if(this.id.indexOf('+') === -1) {
        this.flag = false
      }else{
        this.flag = true
      }
    }
  },
  created() {
    this.checkFlag()
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