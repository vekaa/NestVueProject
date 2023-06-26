import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AddOrEditBook from '../components/AddOrEditBook.vue'
import LogInView from '../views/LogInView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: AddOrEditBook
  },{
    path: '/',
    name: 'Login',
    component: LogInView
  },{
    path: '/logout',
    name: 'Logout',
    component: {
      beforeRouteEnter(to, from,next){
        const destination = {
          path: "/",
        };
        next(destination);
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
