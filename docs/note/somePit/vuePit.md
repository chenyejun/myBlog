# 一些vue坑
1. this.$router.push({'path': '/', params: {}}); path 跳转路由，无法获取params，params需要配合name使用，this.$router.push({name:: '', params: {}})

---
2. 数组数据变动：我们使用某些方法操作数组，变动数据时，有些方法无法被vue监测，有些可以
- Vue包装了数个数组操作函数，使用这些方法操作的数组去，其数据变动时会被vue监测：
```js
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```
vue2.0还增加个方法可以观测Vue.set(items, indexOfItem, newValue)
filter(), concat(), slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组

Vue 不能检测以下变动的数组：
- ① 当你利用索引直接设置一个项时，vm.items[indexOfItem] = newValue
- ② 当你修改数组的长度时，例如： vm.items.length = newLength

demo:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/vue/2.5.14/vue.min.js"></script>
</head>
<body>
<div id="app">
    <ul>
        <li v-for="(item, index) in gc">
            <span>{{item.name}}-{{index}}</span>
            <span>{{item.age}}-{{index}}</span>
        </li>
    </ul>
    <button @click="add">click</button>
</div>
<script>
new Vue({
    el:'#app',
    data:{
        gc:[
            { name:'zhangsan', age:10},
            { name:'lisi', age:21},
            { name:'wangwu', age:22},
            { name:'wangwu', age:22}
        ]
    },
    methods:{
        // 当点击事件触发时候会修改掉gc[0]的值为lisi,但是视图不会发生变化
        add(){
           this.gc[0] ={name:'lisi',age:22}; // 视图不更新
           Vue.set(this.gc,0,{name:'lisi',age:22}); 视图更新
        }
    }
})
</script> 
</body>
</html>
```

---
3. [vue初学技巧](https://www.vue-js.com/topic/5bcd6a9b6005a79b02838995)

---
4. vue 渲染一个input输入框，让输入框进入聚焦状态（focus），需要使用$nextTick()方法
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.min.js"></script>
<body>
</head>
<body>
    <div id='div'>
        <button @click='btnFun'>按钮</button>
        <input v-show='flag' type="text" ref='input'>
    </div>
</body>
<script>
var vm = new Vue({
    el: '#div',
    data: {
      flag: false
    },
     methods: {
         btnFun: function(){
            this.flag = true;
            this.$nextTick(function(){
                this.$refs.input.focus();
            });
         }
     }
});

</script>
</html>
```

---

5. vue生命周期相关：

    (5.1) [vue生命周期1](https://juejin.im/post/5afd7eb16fb9a07ac5605bb3)
    
    (5.2) [vue生命周期2](https://juejin.im/entry/5aee8fbb518825671952308c)
6. vue路由钩子函数相关：
[路由钩子函数](https://juejin.im/post/5b41bdef6fb9a04fe63765f1)

7. vue2.0不让在插值表达式{{}}和v-bind外的地方使用管道过滤器(name | nameFilter)。
