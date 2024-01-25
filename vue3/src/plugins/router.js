import { createRouter , createWebHistory } from "vue-router";

import Home from '../components/HomeComp.vue';
import LogReg from '../components/LogRegComp.vue'
import UserPanel from '../components/UserPanelComp.vue';
import AdminPanel from '../components/AdminPanelComp.vue';
import AdminLogin from '../components/AdminLoginComp.vue';
const routes = 
[
    {
        path : '/',
        component : Home
    },
    {
        path : '/login',
        component : LogReg
    },
    {
        path : '/user',
        component : UserPanel
    },
    {
        path : '/admin',
        component : AdminPanel
    },
    {
        path : '/AdminLogin',
        component : AdminLogin
    },
]

const router = createRouter({
    history : createWebHistory(),
    routes 
});

export default router;