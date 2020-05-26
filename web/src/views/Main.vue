<template>
  <div>
    <!-- topbar -->
    <div class="topbar bg-black py-2 px-4 d-flex ai-center bg-sprite" >
      <router-link to="/" class="logo_img bg-sprite"  />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs" >团队成就更多</div>
      </div>
      <a 
        type="button" 
        class="btn bg-sprite" 
        target="_blank"
        href="//pvp.qq.com/zlkdatasys/mct/d/play.shtml">
      </a>
    </div>

    <div class="nav nav-reverse bg-primary  d-flex jc-around ai-center">
      <router-link :to="{name: 'Home'}" class="h-100 flex-1 d-flex jc-center ai-center">
        <span class="nav-item pb-h mt-1 active">首页</span>
      </router-link>
      <router-link :to="{name: 'Home'}" class="h-100 flex-1 d-flex jc-center ai-center">
        <span class="nav-item pb-h mt-1">攻略中心</span>
      </router-link>
      <router-link :to="{name: 'Home'}" class="h-100 flex-1 d-flex jc-center ai-center">
        <span class="nav-item pb-h mt-1">赛事中心</span>
      </router-link>
    </div>
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style lang="scss">
  .topbar {
    background-position: 0 -27.5rem;
    height: 3.4615rem;
    // 注意兼容性
    position: sticky;
    top: 0;
    z-index: 999;

    .logo_img {
      width: 2.3077rem;
      height: 2.3077rem;
      background-position: 0 -23.6923rem;
    }
    .btn {
      width: 4.615rem;
      height: 1.8461rem;
      background-position: -4.5384rem -23.7692rem;
    }
  }
  
  

</style>