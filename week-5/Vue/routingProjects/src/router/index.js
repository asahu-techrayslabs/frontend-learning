import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Jobs from '@/views/Jobs/Jobs.vue'
import JobDetails from '@/views/Jobs/JobDetails.vue'
import NotFound from '@/views/Jobs/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs,
    },
    {
      path:'/jobs/:id',
      name:'JobDetails',
      component:JobDetails,
      props:true

    },
    {
      path:'/all-jobs',
      redirect:'/jobs'
    
    },
    {
      path:'/:catchAll(.*)',
      name:"notfound",
      component:NotFound
    }
  ],
})

export default router
