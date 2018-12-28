module.exports = {
  title: '吃饭@我',
  description: 'Document library',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
  ],
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      // 下拉列表的配置
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'English', link: '/language/English' }
        ]
      }
    ],
    sidebar: [
      {
        title: 'js',
        collapsable: true,
        children: [
          ['/blog/js/入门', '入门']
        ]
      }
    ]
  }
}