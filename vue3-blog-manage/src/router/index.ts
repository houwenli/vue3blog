import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/bloglist',
        name: 'bloglist',
        meta: {
          isShow: true,
          title: '博客列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/BlogList.vue'),
      },
      {
        path: '/editblog',
        name: 'editblog',
        meta: {
          isShow: false,
          title: '编辑博客'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/EditBlog.vue'),
      },
      {
        path: '/addblog',
        name: 'addblog',
        meta: {
          isShow: true,
          title: '新增博客'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/AddBlog.vue'),
      },
      {
        path: '/blogdetail',
        name: 'blogdetail',
        meta: {
          isShow: false,
          title: '博客详情'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/BlogDetail.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    beforeEnter: (to, from) => {
      console.log(2222, from.name)
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
