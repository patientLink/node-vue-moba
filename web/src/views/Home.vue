<template>
  <div class="home">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img src="~assets/images/swiper01.jpeg" class="w-100" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="~assets/images/swiper02.jpeg" class="w-100" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="~assets/images/swiper03.jpeg" class="w-100" alt />
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
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`" 
            class="px-2 text-center pb-2 fs-sm" 
            v-for="(hero, i) in category" :key="i"
            style="width: 49%"
            >
            <div>111</div>
          </router-link>
          
        </div>
      </template>
    </l-card>
    <l-card 
      title="图文攻略" 
      icon='book'
      :categories="introCats"
    >
      <template #items="{category}">
        <div class="d-flex flex-wrap jc-between" v-lazy-container="{ selector: 'img' }">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`" 
            class="px-2 text-center pb-2 fs-sm" 
            v-for="(hero, i) in category" :key="i"
            style="width: 49%"
            >
            <div>111</div>
          </router-link>
          
        </div>
      </template>
    </l-card>
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
        }
      },
      isMenuOpen: false,
      newsCats: [],
      heroCats: [],
      videoCats: [],
      introCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  updated() {
    // this.fetchNewsCats();
    // this.fetchHeroCats();
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
