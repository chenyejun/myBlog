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
.sb-left-main{margin-right: 300px; margin-top: 10px;}
.sb-left-main .left{width: 100%;float: left;background: #eee;}
.sb-left-main .center{width: 150px;margin-left: -300px;background: #3eaf7c;float: left;position: relative;right: -300px;}
.sb-left-main .right{width: 150px;margin-left: -150px;background: #3eafcd;float: left;position: relative;right: -300px;}
</style>
