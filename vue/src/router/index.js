import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../view/DashboardView.vue'
import Surveys from '../view/SurveysView.vue'
import SurveyView from '../view/SurveyView.vue'
import SurveyPublicView from '../view/SurveyPublicView.vue'
import Login from '../view/LoginView.vue'
import Register from '../view/RegisterView.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from '../store'


const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard },
            { path: '/surveys', name: 'Surveys', component: Surveys },
            { path: '/surveys/create', name: 'SurveyCreate', component: SurveyView },
            { path: '/surveys/:id', name: 'SurveyView', component: SurveyView },
        ]
    },
    {
        path: '/view/survey/:slug',
        name: 'SurveyPublicView',
        component: SurveyPublicView
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: { IsGuest: true },
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'Login' })
    }else if (store.state.user.token && (to.meta.IsGuest)) {
        next({ name: 'Dashboard' })
    } else {
        next()
    }
})

export default router