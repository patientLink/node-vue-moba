<template>
  <div class="page-hero">
    <!-- topbar -->
    <div class="topbar bg-black py-2 px-4 d-flex text-white ai-center bg-sprite" >
      <router-link :to="{name: 'Main'}" class="logo_img bg-sprite"  />
      <div class="px-3 ">王者荣耀</div>
      <div class="flex-1">攻略站</div>
      <router-link 
        to="/" 
        tag="div"
        class="fs-sm d-flex ai-center">
        更多英雄 <span class="fs-xxl ml-2">&gt;</span>
      </router-link>
    </div>

    <!-- banner -->
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div clss="fs-xs">{{model.title}}</div>
        <div class="fs-xl f-bold my-2">{{model.name}}</div>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="fs-sm d-flex scores" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-prop-1">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-prop-2">{{model.scores.skill}}</span>
            <span>攻击</span>
            <span class="badge bg-prop-3">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-prop-4">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey">皮肤：2 &gt;</router-link>
        </div>
        
      </div>
    </div>
    <!-- end of banner -->

    <div class="">
      <!-- nav -->
      <div class="hero-nav bg-white px-3">
        <div class="nav d-flex ai-center jc-around">
          <div>
            <div class="nav-item active">英雄初识</div>
          </div>
          <div>
            <div class="nav-item">进阶攻略</div>
          </div>
        </div>
      </div>

      <!-- swiper -->
      <swiper class="bg-grey-bg">
        <swiper-slide>
          <!-- 技能模块 -->
          <div class="bg-white p-3 ">
            <div class="d-flex jc-between mb-4">
              <router-link to="/" tag="button" class="py-2 d-btn btn-lg"><i class="iconfont icon-ic_play"></i>英雄介绍视频</router-link>
              <router-link to="/" tag="button" class="py-2 d-btn btn-lg"><i class="iconfont icon-picicon "></i>一图识英雄</router-link>
            </div>
            <!-- skills -->
            <div class="hero-skills">
              <div class="d-flex jc-around ai-center">
                <img :src="item.icon" 
                class="icon"
                :class="{active:currentSkillIndex===i}"
                @click="currentSkillIndex = i"
                v-for="(item, i) in model.skills" 
                alt=""
                :key="item.name" />
              </div>
            </div>
            <div v-if="currentSkill">
              <div  class="d-flex ai-center">
                <h3>{{currentSkill.name}}</h3>
                <span class="text-grey-1 ml-4 fs-sm">
                  (冷却值: {{currentSkill.delay}} 消耗: {{currentSkill.cost}})
                </span>
              </div>
              <p style="line-height: 1.5385rem">{{currentSkill.description}}</p>
            </div>
          </div>
          <!-- 加点/出装模块 -->
          <d-card class="mt-3" :bBorder="false" :textBold="true" icon="jineng" title="加点建议" :moreIcon="false">
            <div class="d-flex jc-between">
              <div class="d-flex flex-column">
                <span>主升</span>
                <img src="" alt="">
                <span>技能名</span>
              </div>
              <div class="d-flex flex-column">
                <span>副升</span>
                <img src="" alt="">
                <span>技能名</span>
              </div>
              <div class="d-flex flex-column">
                <span>召唤师技能</span>
                <div class="d-flex">
                  <div class="d-flex flex-column">
                    <img src="" alt="">
                    <span>技能名</span>
                  </div>
                  <div class="d-flex flex-column">
                    <img src="" alt="">
                    <span>技能名</span>
                  </div>
                </div>
              </div>
            </div>
          </d-card>
          <d-card class="mt-0" :textBold="true" icon="zhuangbeiqianghua" title="出装推荐" :moreIcon="false">
            <div>
              <div class="fs-lg">顺风出装</div>
              <div class="d-flex jc-between mt-3 mb-3 bottom-border">
                <div v-for="item in model.items1" 
                :key="item._id" 
                class="d-flex flex-column ai-center hero-item"
                >
                  <img :src="item.icon" alt="">
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="fs-lg">逆风出装</div>
              <div class="d-flex jc-between mt-3">
                <div v-for="item in model.items2" 
                :key="item._id" 
                class="d-flex flex-column ai-center hero-item"
                >
                  <img :src="item.icon" alt="">
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
          </d-card>
          <d-card class="mt-3" :textBold="true" icon="icon" title="使用技巧" :moreIcon="false">
            <p>{{model.usageTips}}</p>
          </d-card>
          <d-card class="mt-3" :textBold="true" icon="zhandouzuozhan" title="对抗技巧" :moreIcon="false">
            <p>{{model.battleTips}}</p>
          </d-card>
          <d-card class="mt-3" :textBold="true" icon="touzhujiqiao" title="团战思路" :moreIcon="false">
            <p>{{model.teamTips}}</p>
          </d-card>
          <d-card class="mt-3" :textBold="true" icon="mingwen" title="英雄关系" :moreIcon="false">
            <div>
              <div class="fs-xl pb-3">最佳搭档</div>
              <div v-for="person in model.partners" 
              :key="person._id"
              class="d-flex ai-top pb-3 hero-rs"
              >
                <img :src="person.hero.avatar" style="width: 3.6923rem; height: auto;" alt="">
                <p class="pl-3" style="line-height: 1.5385rem">{{person.description}}</p>
              </div>
            </div>
            
            
          </d-card>
        </swiper-slide>
      </swiper>
    </div>

    
  </div>
</template>

<script>
  export default {
    name: 'Hero',
    props: {
      id: {required: true}
    },
    data() {
      return {
        model: {
          categories: []
        },
        currentSkillIndex: 0
      }
    },
    computed: {
      currentSkill() {
        return this.model.skills[this.currentSkillIndex]
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get(`heroes/${this.id}`)
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
  .page-hero {
    .top {
      height: 50vw;
      background: #fff no-repeat top center;
      background-size: auto 100%;
    }
    .info {
      background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
      .badge {
        margin: 0 0.3rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255,255,255,0.2);
      }
    }
    .hero-nav {
      &>div{
        border-bottom: 1px solid map-get($map: $colors, $key: 'grey-2');
      }
    }
    .hero-skills {
      .icon {
        width: 4.6154rem;
        height: 4.6154rem;
        box-sizing: content-box;
        border: 3px solid transparent;
        border-radius: 45%;
        &.active {
          border-color: map-get($map: $colors, $key: 'primary');
        }
      }
    }
    .hero-item {
      width: 14%;
      font-size: 0.6923rem;
      img {
        border-radius: 50%;
        
        width: 100%;
        height: auto;
      }
      span {
        margin-top: 0.5385rem;
        margin-bottom: 0.2308rem;
      }
    }
    .hero-rs {
      &:last-child {
        border-bottom: 1px solid map-get($map: $colors, $key: 'grey-2');
      }
    }
  }
</style>