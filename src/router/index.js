import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobsView from "@/views/JobsView.vue";
import JobView from "@/views/JobView.vue";
import EditJobView from "@/views/EditJobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import AddFrappeJobs from "@/views/AddFrappeJobs.vue";

const  router = createRouter({
    history:createWebHistory(import.meta.env.Base_URL),
    routes:[
        {
            path:'/',
            name:'home',
            component:HomeView
        },
        {
            path:'/jobs',
            name:'jobs',
            component:JobsView
        },
        {
            path:'/jobs/:id',
            name:'job',
            component:JobView
        },
        {
            path:'/jobs/add',
            name:'add-job',
            component:AddJobView
        },
        {
            path:'/jobs/add-frappe-jobs',
            name:'add-frappe-jobs',
            component:AddFrappeJobs
        },
        {
            path:'/jobs/edit/:id',
            name:'edit-job',
            component:EditJobView
        },
        {
            path:'/:catchAll(.*)',
            name:'not-found',
            component:NotFoundView

        },
    ]
})

export default router;