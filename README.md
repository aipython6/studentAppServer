# 小程序端项目文档
## 文件结构
### api：封装的API请求
- auth：登录、授权、修改个人信息等<br>
  1.login：用户登录 <br>
  2.addUserinfo：保存个人信息<br>

- book：课本列表显示等<br>
  1.getBookList：获取课本列表<br>
  2.getCollectedBookList：收藏的课本列表<br>
  3.getStudiedBookList：正在学习的课本列表<br>
  4.cancelCollectedBook：取消课本收藏<br>
  5.searchBookByName：按课本名称搜索已收藏的课本<br>
  6.getStudenLearn：获取大家都在学的课本和在做的题目<br>
  7.getTodayResult：获取今日战果数据<br>
  8.getBookDetailById：按课本id查询其对应的课本内容<br>
  9.getBookContentByBookId：根据课本id获取其对应的学习内容(如图片或PPT)


- website：网站列表显示等<br>
  1.getWebsiteList：获取网站列表<br>
  2.getCollectedWebsiteList：收藏的网站列<br>
  3.cancelCollectedWebsite：取消网站收藏<br>
  4.searchWebsiteByName：按网站名称搜索已收藏的网站<br>
  5.searchAllWebsiteByName：按名称搜索全部网站
  
- utils：获取轮播图、图标、文字识别图片上传等<br>
  1.getSwiperList：获取轮播图<br>
  2.getCenterIcons：获取学习中心的图标<br>

- project：课程列表的获取<br>
  1.getHotProjectList：热门课程列表<br>
  2.getProjectList：课程列表(包含一类和二类课程)<br>
  3.getThirdProjectListByName：按课程名称查询其下所有的三类课程列表<br>
  4.getFourthProjectListByName：根据三类课程名称获取四类的课本列表<br>


### components：自定义组件和uni提供的组件
- myComponents：自定义组件<br>
    1.center：学习中心下的组件<br>
      1.1. projctStudy：最近学习<br>
    2.home：个人中心下的组件<br>
      2.1：menuList：菜单列表<br>
      2.2：userinfo：显示个人信息
    3.hotRegion：热门地区<br>
    4.热门网站<br>
- uni：从uni-app下载的组件

### pages：小程序页面
- book：课本<br>
  1.index：课本学习详细页面<br>
- center：学习中心<br>

- exam：首页(显示考试网站)<br>

- home：个人中心<br>
  1.projectCollected：课程收藏(包含有对应每个课程的小组件)<br>
  2.studyRecord：课程学习(包含有对应每个课程的小组件)<br>
  3.userinfo：个人信息<br>

- project：课程信息<br>
  1.index:课程列表包含有对应每个课程的小组件
  2.hotProject：热门课程中每个课程的小组件包含有对应每个课程的小组件<br>
  3.projectDetailList<br>
    3.1.index：点击课程名称后展示所有课本的列表<br>
    3.2.bookList：点击其中一个课程，显示其下所有的课程<br>
- tool：图片文字识别页面<br>

### store：vuex管理文件

### utils：其他用到的工具函数

### uview：u-view的UI库