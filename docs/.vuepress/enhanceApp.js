function integrateGitalk(router) {
  const linkGitalk = document.createElement('link');
  linkGitalk.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
  linkGitalk.rel = 'stylesheet';
  document.body.appendChild(linkGitalk);
  const scriptGitalk = document.createElement('script');
  scriptGitalk.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
  document.body.appendChild(scriptGitalk);

  router.afterEach((to) => {
    if (scriptGitalk.onload) {
      loadGitalk(to);
    } else {
      scriptGitalk.onload = () => {
        loadGitalk(to);
      }
    }
  });

  function loadGitalk(to) {
    const $page = document.querySelector('.page');
    // 每次删除重建gitalk-container
    let commentsContainer = document.getElementById('gitalk-container');
    if (!commentsContainer) {
      commentsContainer = document.createElement('div');
      commentsContainer.id = 'gitalk-container';
      commentsContainer.classList.add('content');
    } else {
      $page.removeChild(commentsContainer);
      commentsContainer = document.createElement('div');
      commentsContainer.id = 'gitalk-container';
      commentsContainer.classList.add('content');
    }
    if ($page) {
      $page.appendChild(commentsContainer);
      if (typeof Gitalk !== 'undefined' && Gitalk instanceof Function) {
        // 截取路径的文件名，用于初始化gitalk的id，该id也是issue中labels
        let splitStr = to.fullPath.split('.html')[0];
        let fullPathArr = splitStr.split('/');
        let id = fullPathArr[fullPathArr.length - 1];
        console.log('id：', id);
        renderGitalk(id);
      }
    }
  }
  function renderGitalk(id) {
    const gitalk = new Gitalk({
      clientID: '54a8ac68921be8b45ec0', // clientID和clientSecret从  https://github.com/settings/applications/new 申请 
      clientSecret: '230aa0c74e191ee05e7233cb324a52fe5588e391', // come from github development
      repo: 'myBlog', // 你的博客仓库
      owner: 'chenyejun', // 你的github username
      admin: ['chenyejun'], // GitHub repository 的所有者和合作者 (对这个 repository 有写权限的用户)
      id: id, // 对应博客仓库issue的label，注意，你新建issue的label需要包含该id和Gitalk这两个label
      distractionFreeMode: false,
      language: 'zh-CN',
    });
    gitalk.render('gitalk-container');
  }
}

export default ({Vue, options, router}) => {
  try {
    document && integrateGitalk(router)
  } catch (e) {
    console.error(e.message)
  }
}