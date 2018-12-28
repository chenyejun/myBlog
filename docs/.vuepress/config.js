module.exports = {
  title: '吃饭@我',
  description: 'Document library',
  head: [
    ['link', { rel: 'icon', href: `/logo.ico` }],
  ],
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      // 下拉列表的配置
      // {
      //   text: 'blog',
      //   items: [
      //     { text: 'Chinese', link: '/blog/js/入门.html' }
      //   ]
      // }
      { text: '博客', link: '/blog/js/入门.html' },
      { text: '笔记', link: '/note/css/css.html' },
    ],
    sidebar: {
      // 展示blog路径下的md
      '/blog/': [
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
            ['/note/demo/jigsaw', '拼图游戏']
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