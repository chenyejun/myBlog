<template>
  <div class="sb-right-main fix">
    <div class="right">right自适应</div>
    <div class="left">left</div>
    <div class="center">center</div>
  </div>
</template>
<script>
export default {
  name: 'note-css-sb-right',
  data () {
    return { 
    }
  }
};
</script>
<style>
.sb-right-main{margin-left:300px; margin-top: 10px;}
.sb-right-main .right{width: 100%;background: #ccc;float: left;}
.sb-right-main .left{width: 150px;float: left;margin-left: -100%;position: relative;left:-300px;background:  #3eaf7c;}
.sb-right-main .center{width: 150px;float: left;margin-left: -100%;position: relative;left:-150px;background: #3eafcd;}
</style>
