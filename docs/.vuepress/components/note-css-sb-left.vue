<template>
  <div class="sb-left-main fix">
    <div class="left">left自适应</div>
    <div class="center">center</div>
    <div class="right">right</div>
  </div>
</template>
<script>
export default {
  name: 'note-css-sb-left',
  data () {
    return { 
    }
  }
};
</script>
<style>
.sb-left-main{margin-right: 120px; margin-top: 10px;}
.sb-left-main .left{width: 100%;float: left;background: #eee;}
.sb-left-main .center{width: 60px;margin-left: -120px;background: #3eaf7c;float: left;position: relative;right: -120px;}
.sb-left-main .right{width: 60px;margin-left: -60px;background: #3eafcd;float: left;position: relative;right: -120px;}
</style>
