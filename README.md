# myBlog

目录结构：
--docs
  --.vuepress
  --components // vue组件，用于md页面引用
  --dist // vuepress build docs 项目打包后的生成的目录，用于部署到github
  --public // 静态资源存放，存放页面静态图片、logo等
  --config.js // 配置文件，用于配置博客页面结构和内容
  --blog // （自定义可新增）博客相关markdown文件
  --note // （自定义可新增）笔记相关markdown文件
  --README.md // 默认主题相关配置 [官方配置](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5)
--node_modules // 依赖
--deploy.sh // 自动部署到github的脚本
--package.json // webpack相关配置
