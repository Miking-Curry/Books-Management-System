import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout.vue'
import BookManage from '@/views/BookManage.vue'
import ReaderManage from '@/views/ReaderManage.vue'
import BorrowManage from '@/views/BorrowManage.vue'
import DataStats from '@/views/DataStats.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/books',
    children: [
      { path: '/books', name: 'BookManage', component: BookManage },
      { path: '/readers', name: 'ReaderManage', component: ReaderManage },
      { path: '/borrow', name: 'BorrowManage', component: BorrowManage },
      { path: '/stats', name: 'DataStats', component: DataStats }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router