<template>
   <div class="sb-center-main fix">
        <div class="center">center自适应</div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</template>
<script>
export default {
  name: 'note-css-sb-center',
  data () {
    return { 
    }
  }
};
</script>
<style>
.sb-center-main {padding: 0 150px; margin-top: 10px;}
.sb-center-main .center{width: 100%;background: #eee;float: left;}
.sb-center-main .left{width: 150px;float: left;margin-left: -100%;position: relative;left:-150px;background: #3eaf7c;}
.sb-center-main .right{width: 150px;float: left;margin-left: -150px;position: relative;right: -150px;background:#3eaf7c;}

.fix{zoom:1;}
.fix::after{clear:both;display:block;height:0;content:"";}
</style>
