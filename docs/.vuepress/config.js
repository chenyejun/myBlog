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
            ['/blog/css/css中的BFC', 'css中的BFC']
          ]
        },
        {
          title: 'js',
          collapsable: true,
          children: [
            ['/blog/js/入门', '入门']
          ]
        },
        ['/blog/JigsawGame', '自定义上传图片拼图游戏']
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
            ['/note/css/css', 'css相关']
          ]
        },
        {
          title: 'webSocket',
          collapsable: true,
          children: [
            ['/note/websocket/nodejs的ws实现webSocket', 'nodejs的ws实现webSocket'],
            ['/note/websocket/nodejs的socket.io实现webSocket', 'nodejs的socket.io实现webSocket']
          ]
        },
        {
          title: 'git',
          collapsable: true,
          children: [
            ['/note/git/git命令', 'git基础命令']
          ]
        },
        {
          title: 'pm2',
          collapsable: true,
          children: [
            ['/note/pm2/pm2命令', 'pm2基础命令']
          ]
        },
        {
          title: 'nginx',
          collapsable: true,
          children: [
            ['/note/nginx/nginx命令', 'nginx基础命令']
          ]
        }
      ]
    },
  }
}