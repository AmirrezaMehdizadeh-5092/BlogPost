import { createRouter , createWebHistory } from "vue-router";

import Home from '../components/HomeComp.vue';
import LogReg from '../components/LogRegComp.vue'
import UserPanel from '../components/UserPanelComp.vue';
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
]

const router = createRouter({
    history : createWebHistory(),
    routes 
});

export default router;