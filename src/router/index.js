import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobsView from "@/views/JobsView.vue";
import JobView from "@/views/JobView.vue";
import EditJobView from "@/views/EditJobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import AddFrappeJobs from "@/views/Frappe Job View/FrappeAddJob.vue";
import FrappeAllJobsListing from "@/components/Frappe Job Components/FrappeAllJobsListing.vue";
import FrappeJobView from "@/views/Frappe Job View/FrappeJobView.vue";
import FrappeEditJob from "@/views/Frappe Job View/FrappeEditJob.vue";
import FrappeAddApi from "@/components/Frappe Job Components/FrappeAddApi.vue";

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
            path:'/jobs/edit/:id',
            name:'edit-job',
            component:EditJobView
        },
        {
            path:'/jobs/add-frappe-jobs',
            name:'add-frappe-jobs',
            component:AddFrappeJobs
        },
        {
            path:'/jobs/view-frappe-all-jobs',
            name:'view-frappe-all-jobs',
            component:FrappeAllJobsListing
        },
        {
            path:'/frappe-jobs/:name',
            name:'frappe-jobs',
            component:FrappeJobView
        },
        {
            path:'/frappe-jobs-edit/:name',
            name:'frappe-jobs-edit',
            component:FrappeEditJob
        },
        {
            path:'/add-frappe-api',
            name:'add-frappe-api',
            component:FrappeAddApi
        },
        {
            path:'/:catchAll(.*)',
            name:'not-found',
            component:NotFoundView

        },
    ]
})

export default router;