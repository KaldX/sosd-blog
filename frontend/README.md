## sosd-frontend

```
sosd-frontend/
├── public/                     # 静态资源，会被直接复制到构建输出的根目录
│   └── favicon.ico             # 网站图标
│   └── index.html              # HTML 入口文件
│
├── src/                        # 项目源代码
│   ├── assets/                 # 静态资源
│   │   ├── images/             # 图片资源
│   │   │   ├── logo.png        # 项目Logo图片
│   │   │   └── momo.jpg        # 测试头像
│   │   ├── primevue-tailwind-theme/ # PrimeVue Tailwind主题CSS文件存放处
│   │   │   └── tailwind.css    # PrimeVue Tailwind主题的主CSS文件
│   │   └── base.css         
│   │
│   ├── components/             # 可复用的UI组件
│   │   ├── article/            # 文章相关的UI组件
│   │   │   ├── ArticleCard.vue # 单个文章卡片的展示组件
│   │   │   ├── ArticleCardSkeleton.vue # 文章卡片加载时的骨架屏组件
│   │   │   └── ArticleList.vue # 文章列表的容器组件
│   │   ├── common/             # 通用原子组件
│   │   │   └── AppLogo.vue     # 显示项目Logo的组件
│   │   ├── comment/            # (空) 评论相关的UI组件
│   │   ├── editor/             # (空) 编辑器相关的UI组件
│   │   ├── icons/              # (空) 存放自定义SVG图标的组件
│   │   ├── layout/             # 页面布局相关的组件
│   │   │   ├── AppFooter.vue   # 全局页脚组件
│   │   │   ├── AppHeader.vue   # 全局页头/导航栏组件
│   │   │   ├── AuthLayout.vue  # 认证页面 (登录/注册) 的特定卡片式布局组件
│   │   │   └── HomeSidebarWidget.vue # 首页右侧边栏小部件的通用包裹组件
│   │   ├── user/               # 用户认证相关的表单组件
│   │   │   ├── LoginForm.vue   # 登录表单组件
│   │   │   └── RegisterForm.vue# 注册表单组件
│   │   └── widgets/            # 可复用的小部件
│   │       ├── ArticleRankingWidget.vue # 文章排行榜小部件
│   │       ├── PromotionWidget.vue      # 活动推广小部件
│   │       └── SignInWidget.vue         # 签到小部件
│   │
│   ├── layouts/                # 顶层路由布局组件
│   │   ├── AuthMasterLayout.vue # 认证页面的主布局 (背景和居中容器/没有HEADER和FOOTER)
│   │   └── MainAppLayout.vue    # 主应用页面的主布局 (通常包含页头、页脚和内容区)
│   │
│   ├── router/                 # Vue Router 配置
│   │   └── index.js            # 路由定义、路由守卫、Router实例创建
│   │
│   ├── services/               # (空) API服务层
│   │
│   ├── store/                  # Pinia 状态管理
│   │   └── index.js            # Pinia实例创建
│   │   └── modules/            # (空) Pinia模块
│   │
│   ├── styles/                 # 全局样式文件
│   │   ├── index.css           # 主CSS入口文件 (导入Tailwind, PrimeVue主题, 自定义变量和全局样式)
│   │   └── primevue-variables.css # 定义PrimeVue Tailwind Preset所需的CSS变量
│   │
│   ├── utils/                  # (空) 通用工具函数
│   │
│   ├── views/                  # 页面级视图组件
│   │   ├── HomePage.vue        # 博客主页视图
│   │   ├── LoginPage.vue       # 登录页面视图
│   │   └── RegisterPage.vue    # 注册页面视图
│   │
│   ├── App.vue                 # Vue应用的根组件
│   └── main.js                 # 应用入口文件
│
├── .eslintrc.cjs               # ESLint 配置文件
├── .gitignore                  # Git忽略文件配置
├── .prettierrc.json            # Prettier 代码格式化配置文件
├── index.html                  # Vite 应用的 HTML 入口文件
├── jsconfig.json               # JavaScript 项目的配置文件
├── package.json                # 项目依赖和脚本定义
├── package-lock.json           # 锁定项目依赖版本
├── postcss.config.js           # PostCSS 配置文件 (用于Tailwind CSS, autoprefixer, postcss-import)
├── README.md                   # 项目说明文件
├── tailwind.config.js          # Tailwind CSS 配置文件
└── vite.config.js              # Vite 构建工具配置文件
```