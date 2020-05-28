<template>
  <div class="home">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="item in adsCats" :key="item._id">
        <a :href="item.url">
          <img :src="item.img" class="w-100" alt />
        </a>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>

    <div id="home-menu" :class="'mt-2 ' + (isMenuOpen ? '' : 'unopen')">
      <div class="first-line-menu-container">
        <ul class="d-inline-flex first-line-menu flex-nowrap bg-white fs-sm home-sprite-ul">
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>爆料站</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>故事站</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>周边商城</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>体验服</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>新人专区</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>荣耀·传承</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>模拟战资料库</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>王者营地</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>公众号</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="home-sprite-icon"></i>
              <span>版本介绍</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>对局环境</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>无限王者团</span>
            </a>
          </li>
          <li class="home-sprite-li d-flex">
            <a href target="_blank">
              <i class="bg-sprite home-sprite-icon"></i>
              <span>创意互动营</span>
            </a>
          </li>
        </ul>
      </div>
      <ul class="d-flex whole-menu flex-wrap bg-white fs-sm home-sprite-ul">
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>爆料站</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>故事站</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>周边商城</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>体验服</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>新人专区</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>荣耀·传承</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>模拟战资料库</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>王者营地</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>公众号</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="home-sprite-icon"></i>
            <span>版本介绍</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>对局环境</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>无限王者团</span>
          </a>
        </li>
        <li class="home-sprite-li d-flex">
          <a href target="_blank">
            <i class="bg-sprite home-sprite-icon"></i>
            <span>创意互动营</span>
          </a>
        </li>
      </ul>
      <div class="bg-light d-flex jc-center ai-center entry-bar" @click="isMenuOpen=!isMenuOpen">
        <span class="entry-icon bg-sprite"></span>
        <span class="entry-name fs-sm ml-1">展开</span>
      </div>
    </div>
    <!-- menu end -->
    <l-card 
      title="新闻资讯" 
      :withBaseline="true"
      icon='cc-menu-circle'
      :categories="newsCats"
    >
      <template #items="{category}">
        <router-link 
          tag="div"
          :to="`/articles/${item._id}`"
          class="px-2 py-q fs-lg d-flex" v-for="(item, i) in category" :key="i">
          <span class="text-info">[{{item.categoryName}}]</span>
          <span class="px-h">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis">{{item.title}}</span>
          <span class="fs-sm text-grey-1">{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </l-card>
    <l-card 
      title="英雄列表" 
      :withBanner="true"
      icon='card-hero'
      :categories="heroCats"
      ref="heroList"
    >
      <template #banner >
        <img src="~assets/images/home-heroes-banner.jpg" alt="">
      </template>
      <template #items="{category}">
        <div class="d-flex flex-wrap" v-lazy-container="{ selector: 'img' }">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`" 
            class="px-2 text-center pb-2 fs-sm" 
            v-for="(hero, i) in category" :key="i"
            style="width: 20%"
            >
            <img class="w-100" :data-src="hero.avatar" alt="">
            <div>{{hero.name}}</div>
          </router-link>
          
        </div>
      </template>
    </l-card>
    <l-card 
      title="精彩视频" 
      icon='xtqb_class_novideo'
      :categories="videoCats"
    >
      <template #items="{category}">
        <div class="d-flex flex-wrap jc-between" v-lazy-container="{ selector: 'img' }">
          <a
            :href="video.link"
            class="px-1 text-center pb-2" 
            v-for="(video, i) in category" :key="i"
            style="width: 50%; "
            >
            <img style="width: 100%; height: 7.8846rem" :data-src="video.img" alt="">
            <div class="mt-2 text-more-ellipsis" style="line-height: 1.5rem;">{{video.title}}</div>
            <div class="text-right fs-xs py-2" style="">{{video.createdAt | date}}</div>
          </a>
        </div>
      </template>
    </l-card>
    <load-more ref="videoLoadTrigger" @load-more="videoLoadHandler"></load-more>
    <l-card 
      title="图文攻略" 
      icon='book'
      :categories="introCats"
      ref="introList"
      @slide="(type) => this.currentIntroType = type"
    >
      <template #items="{category}" >
        <div class="d-flex flex-column jc-start" v-lazy-container="{ selector: 'img' }">
          <router-link
            tag="div"
            :to="`/articles/${intro._id}+`" 
            class="mx-3 pr-4 d-flex py-q bottom-border" 
            v-for="(intro, i) in category" :key="i"
            style="width: 100%; height: 7.0769rem"
            >
            <img :data-src="intro.img" style="width:35%; height:auto;" alt="">
            <div class="px-2 d-flex flex-column jc-between" style="width: 65%">
              <p class="text-ellipsis" style="font-size: 1.1538rem;">{{intro.title}}</p>
              <p class="text-more-ellipsis fs-sm text-grey" style="line-height: 1.2308rem; height: 2.4615rem">{{intro.title}}</p>
              <span class="text-left fs-xs text-grey" style="">{{intro.createdAt | date}}</span>
            </div>
            
          </router-link>
          
        </div>
      </template>
    </l-card>
    <load-more ref="introLoadTrigger" @load-more="introLoadHandler"></load-more>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: "Home",
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        },
        loop: true
      },
      isMenuOpen: false,
      adsCats: [],
      newsCats: [],
      heroCats: [],
      videoCats: [],
      introCats: [{name:'最新'},{name: '英雄'},{name: '新手'},{name: '官方'},{name: '同人'}],
      introPageList: [0,0,0,0,0],
      currentIntroType: 0
    };
  },
  methods: {

    // 首页轮播图控制函数
    swiperLoop() {
      const swiperItem = this.$refs.mySwiper.$el;
      let swiperHandler = () => {
        this.homeSwiperTimer = setInterval(() => {
          this.$refs.mySwiper.$swiper.slideNext()
        }, 3000);
      };

      swiperHandler()
      this.swiperLoopStopHandler = () => {
        clearInterval(this.homeSwiperTimer)
        swiperItem.addEventListener('touchend', () => {
          swiperHandler()
        },{once: true})
      }

      swiperItem.addEventListener('touchstart', this.swiperLoopStopHandler)
    },
    // 获取首页广告列表
    async fetchAds(name) {
      const res = await this.$http.get(`ads/list?name=${name}`)
      this.adsCats = res.data
    },
    // 获取新闻列表
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    // 获取英雄列表
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
      console.log(1)
      // this.$refs.heroList.refresh()
    },
    // 获取视频列表
    async fetchVideoCats() {
      const res = await this.$http.get('videos/list')
      this.videoCats = res.data
    },
    // 获取攻略列表 按类别分页获取
    async fetchIntroCats(type) {
      let page = this.introPageList[type]
      const res = await this.$http.get(`intros/list?type=${type}&page=${page}`)
      if(page === 0) {
        this.$set(this.introCats, `${type}`, res.data[0])
      }else {
        this.introCats[type].introList = [...this.introCats[type].introList, ...res.data[0].introList]
      }
      // 当前类别的页码自增1
      this.introPageList[type]++
    },
    // 视频列表加载更多功能未实现
    async videoLoadHandler() {
      console.log('video load')
    },
    // 攻略列表加载更多
    async introLoadHandler() {
      await this.fetchIntroCats(this.currentIntroType)
    },
    // 防抖函数
    debounce(fn, delay=200, immediate) { // immediate为立即触发型
      let timer = null;
      return function() {
        let context = this;
        if(timer) {
          clearTimeout(timer)
        }
        if(immediate) {
          let callNow = !timer; // 倒计时途中触发，则callNow为false，fn不执行
          timer = setTimeout(() => {
            timer = null;
          })
          if(callNow) {fn.apply(context, arguments)}
        }else {
          timer = setTimeout(() => {
            fn.apply(context, arguments);
          }, delay)
        }
      }
    },
    // 节流函数
    throttle(fn, delay=200) {
      let last = 0;
      return function() {
        let context = this;
        let now = Date.now();
        if(now - last > delay) {
          fn.apply(context, arguments);
          last = now;
        }
      }
    }
  },
  created() {
    // 获取数据
    this.fetchAds('home')
    this.fetchNewsCats();
    this.fetchHeroCats();
    this.fetchVideoCats();
    this.fetchIntroCats(0);
    this.fetchIntroCats(1);
    this.fetchIntroCats(2);
    this.fetchIntroCats(3);
    this.fetchIntroCats(4);
  },
  mounted() {
    console.log('home mounted')
    
    this.innerHeight = window.innerHeight;
    // 攻略列表加载更多底部栏触发
    this.introLoadTrigger = this.throttle(() => {
      const trigger = this.$refs.introLoadTrigger.$el;
      if(trigger.getBoundingClientRect().top < this.innerHeight) {
        this.introLoadHandler()
      }
    }, 100)
    
  },
  updated() {
    // console.log('home updated')
  },
  activated() {
    console.log('home activated')
    document.addEventListener('scroll', this.introLoadTrigger)
    this.swiperLoop()
  },
  deactivated() {
    console.log('home disactivated')
    clearInterval(this.homeSwiperTimer)
    document.removeEventListener('scroll', this.introLoadTrigger)
    this.$refs.mySwiper.$el.removeEventListener('touchstart', this.swiperLoopStopHandler)
  },
  beforeDestroy() {
    console.log('home destroyed')
    document.removeEventListener('scroll', this.introLoadTrigger)
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
#home-menu {
  width: 100%;
  height: 23.8462rem;
  border: 1px solid map-get($map: $colors, $key: 'grey-2');
  border-width: 1px 0 1px 0;
  position: relative;
  overflow: hidden;
  .first-line-menu-container {
    overflow-x: scroll;
    height: 5.7692rem;
  }
  .home-sprite-ul {
    .home-sprite-li {
      height: 5.3846rem;
      width: 25%;
      padding: 0.7692rem 0;

      a {
        width: 100%;
        height: 100%;
        position: relative;
        color: map-get($map: $colors, $key: "dark-1");
        i {
          width: 100%;
          height: 100%;
          position: absolute;
          background-position: -14.4615rem -4.4615rem;
          &::after {
            position: absolute;
            top: 0;
            right: 0;
            content: "";
            height: 100%;
            width: 1px;
            display: block;
            background: map-get($map: $colors, $key: "grey-2");
          }
        }
        span {
          position: absolute;
          text-align: center;
          width: 100%;
          top: 2.6rem;
        }
      }
      &:nth-of-type(2) {
        a {
          i {
            background-position: -21.6923rem -4.3846rem;
          }
        }
      }
      &:nth-of-type(3) {
        a {
          i {
            background-position: -7.2308rem 0.3846rem;
          }
        }
      }
      &:nth-of-type(4) {
        a {
          i {
            background-position: 0.1538rem -4.3846rem;
            &::after {
              content: "";
              display: none;
            }
          }
        }
      }
      &:nth-of-type(5) {
        a {
          i {
            background-position: -21.6923rem 0.3846rem;
          }
        }
      }
      &:nth-of-type(6) {
        a {
          i {
            background-position: -7.1154rem -4.3846rem;
          }
        }
      }
      &:nth-of-type(7) {
        a {
          i {
            background-position: 0 0.3077rem;
          }
        }
      }
      &:nth-of-type(8) {
        a {
          i {
            background-position: -14.4615rem 0.4615rem;
            &::after {
              content: "";
              display: none;
            }
          }
        }
      }
      &:nth-of-type(9) {
        a {
          i {
            background-position: 2.6923rem -31.5385rem;
          }
        }
      }
      &:nth-of-type(10) {
        a {
          i {
            background: url("~assets/images/sprites-01.png") no-repeat;
            background-size: 2.1154rem;
            background-position: 2.5385rem 0.3846rem;
          }
        }
      }
      &:nth-of-type(11) {
        a {
          i {
            background: url("~assets/images/sprites-02.png") no-repeat;
            background-size: 3.0769rem;
            background-position: 2.1154rem 0.3846rem;
          }
        }
      }
      &:nth-of-type(12) {
        a {
          i {
            background: url("~assets/images/sprites-03.png") no-repeat;
            background-size: 3.4615rem;
            background-position: 1.9231rem 0.7692rem;
            &::after {
              content: "";
              display: none;
            }
          }
        }
      }
      &:nth-of-type(13) {
        a {
          i {
            background: url("~assets/images/sprites-04.png") no-repeat;
            background-size: 2.6923rem;
            background-position: 2.3077rem 0;
          }
        }
      }
    }
    &.whole-menu {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    &.first-line-menu {
      .home-sprite-li {
        width: 7.2116rem;
        a {
          i {
            &::after {
            position: absolute;
            top: 0;
            right: 0;
            content: "";
            height: 100%;
            width: 1px;
            display: block;
            background: map-get($map: $colors, $key: "grey-2");
          }
          }
        }
      }
    }
  }
  .entry-bar {
    width: 100%;
    height: 2.3077rem;
    position: absolute;
    bottom: 0;
    left: 0;

    .entry-icon {
      width: 0.7692rem;
      height: 0.7692rem;
      background-position: -10.7692rem -17.8462rem;
    }
  }
  &.unopen {
    height: 7.6923rem;
    .home-sprite-ul {
      &.whole-menu {
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      }
    }
    .entry-bar {
      .entry-icon {
        width: 0.7692rem;
        height: 0.7692rem;
        background-position: -10.7692rem -17.8462rem;
        transform: rotate(180deg);
      }
    }
  }
}


</style>
