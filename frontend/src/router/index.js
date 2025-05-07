import { createRouter, createWebHistory } from 'vue-router';

// 视图组件
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
// import ArticleDetailPage from '../views/ArticleDetailPage.vue'; // 还没做
// import NotFoundPage from '../views/NotFoundPage.vue'; // 还没做

// 布局组件
import MainAppLayout from '../layouts/MainAppLayout.vue';
import AuthMasterLayout from '../layouts/AuthMasterLayout.vue';

const routes = [
  {
    path: '/',
    component: MainAppLayout, // 主应用布局
    children: [
      {
        path: '', // 默认子路由，即首页
        name: 'Home',
        component: HomePage,
      },
      // --- 需要Header和Footer的页面路由放在这里 ---
      // {
      //   path: 'article/:id',
      //   name: 'ArticleDetail',
      //   component: ArticleDetailPage,
      //   props: true,
      // },
      // {
      //   path: 'profile/:userId',
      //   name: 'UserProfile',
      //   component: () => import('../views/user/UserProfilePage.vue'),
      //   props: true,
      //   meta: { requiresAuth: true },
      // },
      // {
      //   path: 'editor/new',
      //   name: 'ArticleCreate',
      //   component: () => import('../views/editor/ArticleEditorPage.vue'),
      //   meta: { requiresAuth: true },
      // },
    ],
  },
  {
    path: '/auth', // 认证相关的路由组（这里将不会拥有header与footer）
    component: AuthMasterLayout, // 认证页面布局
    redirect: '/auth/login', // 如果直接访问 /auth，重定向到登录页
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage,
        meta: { guestOnly: true } // 如果已登录，访问此页会重定向
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterPage,
        meta: { guestOnly: true }
      },
    ],
  },
  // --- 404 页面 (还没做) ---
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: NotFoundPage, // 如果NotFoundPage不需要任何特定布局
  //   // 或者使用 MainAppLayout的话 （还没有想好）
  //   // component: MainAppLayout,
  //   // children: [ { path: '', component: NotFoundPage } ]
  // }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 路由切换时，滚动到页面顶部
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// --- 路由守卫 （AI写的 仅作示例） ---
// router.beforeEach((to, from, next) => {
//   const userStore = null; // TODO: const userStore = useUserStore();
//   const isLoggedIn = userStore ? userStore.isLoggedIn : false; // 模拟
//
//   if (to.meta.requiresAuth && !isLoggedIn) {
//     next({ name: 'Login', query: { redirect: to.fullPath } });
//   } else if (to.meta.guestOnly && isLoggedIn) {
//     next({ name: 'Home' });
//   } else {
//     next();
//   }
// });

export default router;
