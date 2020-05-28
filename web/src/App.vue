<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  window.onresize = setFontSize;
  setFontSize();
  function setFontSize(){
      var designWidth = 375; // 设计图以375*667为基准
      var windowWidth = document.documentElement.clientWidth;
      document.documentElement.style.fontSize = 13 * (windowWidth / designWidth) + "px";

  }
</script>

<style >

</style>
