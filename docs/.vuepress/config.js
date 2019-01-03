module.exports = {
  title: '吃饭@我',
  description: '博客',
  head: [
    ['link', { rel: 'icon', href: `/logo.ico` }],
  ],
  themeConfig: {
    repo: 'https://github.com/chenyejun?tab=repositories', // 导航栏生成github链接
    // 导航栏设置
    nav: [
      { text: '主页', link: '/' },
      // 下拉列表的配置
      // {
      //   text: 'blog',
      //   items: [
      //     { text: 'Chinese', link: '/blog/js/入门.html' }
      //   ]
      // }
      { text: '博客', link: '/blog/JigsawGame.html' },
      { text: '笔记', link: '/note/demo/jigsaw.html' },
    ],
    // 侧边栏设置
    sidebar: {
      // 展示blog路径下的md
      '/blog/': [
        {
          title: 'css',
          collapsable: true,
          children: [
            ['/blog/css/cssBFC', 'css中的BFC']
          ]
        },
        {
          title: 'js',
          collapsable: true,
          children: [
            ['/blog/js/ajaxHistory', 'ajax与history实现无刷新修改url']
          ]
        },
        {
          title: 'nodejs',
          collapsable: true,
          children: [
            ['/blog/nodejs/expressFirstDis', 'express框架初识']
          ]
        },
        {
          title: 'mongoDB',
          collapsable: true,
          children: [
            ['/blog/mongoDB/winInstallMongodb', 'windows安装mongodb'],
            ['/blog/mongoDB/mongodbAddUser', 'mongodb添加管理员和用户'],
            ['/blog/mongoDB/operaMongoCommand', '操作mongodb相关命令']
          ]
        },
        ['/blog/JigsawGame', '自定义上传图片拼图游戏'],
        ['/blog/weixinJSDK', '微信本地调试js-sdk'],
        ['/blog/base64FileRelation', 'base64图片编码大小与原图文件大小之间的联系']
      ],
      // 展示bote路径下的md
      '/note/': [
        {
          title: '好玩的demo',
          collapsable: true,
          children: [
            ['/note/demo/calendar', '日历'],
            ['/note/demo/jigsaw', '拼图游戏'],
            ['/note/demo/signature', '手写签名']
          ]
        },
        {
          title: 'css',
          collapsable: true,
          children: [
            ['/note/css/cssRelation', 'css相关'],
            ['/note/css/grailLayout', '圣杯布局']
          ]
        },
        {
          title: 'js',
          collapsable: true,
          children: [
            ['/note/js/baiduMapGetDis', '百度地图api获取两坐标距离']
          ]
        },
        {
          title: 'webSocket',
          collapsable: true,
          children: [
            ['/note/websocket/nodejsWsWebSocket', 'nodejs的ws实现webSocket'],
            ['/note/websocket/nodejsSocketIoWebSocket', 'nodejs的socket.io实现webSocket']
          ]
        },
        {
          title: 'git',
          collapsable: true,
          children: [
            ['/note/git/gitBasicCommand', 'git基础命令']
          ]
        },
        {
          title: 'pm2',
          collapsable: true,
          children: [
            ['/note/pm2/pm2BasicCommand', 'pm2基础命令']
          ]
        },
        {
          title: 'nginx',
          collapsable: true,
          children: [
            ['/note/nginx/nginxBasicCommand', 'nginx基础命令']
          ]
        },
        {
          title: '开发过程遇到的一些坑',
          collapsable: true,
          children: [
            ['/note/somePit/developPit', '一些浅坑'],
            ['/note/somePit/vuePit', '一些vue坑'],
          ]
        }
      ]
    },
  },
  plugins: [
    // 使用搜索插件，vuepress自带
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}