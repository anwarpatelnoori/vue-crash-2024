<script setup>
import { reactive, defineProps, onMounted } from 'vue';
import FrappeSingleJobListing from './FrappeSingleJobListing.vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import frappe_api_key_2 from '@/utils/frappe_api_keys';

// Reactive state
const state = reactive({
    jobs: [],
    isLoading: true,
    showAllJobs: false,
});

const job_fields = [
    "name",
    "employment_type",
    "designation",
    "job_title",
    "description",
    "location",
    "lower_range",
    "upper_range",
    "company"
];
const job_fields_json = encodeURIComponent(JSON.stringify(job_fields));
const company_fields = ["email", "phone_no", "company_description"]
const company_fields_json = encodeURIComponent(JSON.stringify(company_fields));

// Fetch jobs data on component mount
onMounted(async () => {
    const call_frappe_api = frappe_api_key_2()
    try {
        // Get Company
        const company_response = await call_frappe_api.get(`/resource/Company?limit_start=1&amp;limit=1`)
        const company_name = company_response.data.data[0].name;
        const company_details_response = await call_frappe_api.get(`/resource/Company?filters=[["name","=","${company_name}"]]&fields=${company_fields_json}`)
        state.company = company_response.data.data[0].name;
        state.company_email = company_details_response.data.data[0]['email'];
        state.company_phone = company_details_response.data.data[0]['phone_no']
        state.company_description = company_details_response.data.data[0]['company_description']
        // get job
        const response = await call_frappe_api.get(`/resource/Job Opening?fields=${job_fields_json}`);
        state.jobs = response.data.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
    } finally {
        state.isLoading = false;
    }
});

// Props for the component
defineProps({
    limit: {
        type: Number,
        default: 6, // Default limit for jobs displayed initially
    },
    showButton: {
        type: Boolean,
        default: true, // Toggle for "View All" button
    },
});
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <!-- Show Loading spinner while loading -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
                <span>Please enter the Frappe API to see your job listing ...</span>
            </div>

            <!-- Show job listings when loading is done -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FrappeSingleJobListing v-for="job in (state.showAllJobs ? state.jobs : state.jobs.slice(0, limit))"
                    :key="job.name" :job="job" />
            </div>
        </div>
    </section>

    <!-- Section for View All or Show Less button -->
    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <!-- Show "View All Jobs" button if not showing all -->
        <RouterLink v-if="!state.showAllJobs" to="#"
            class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            @click.prevent="state.showAllJobs = true">
            View All Jobs
        </RouterLink>
        <!-- Show "Show Less" button if showing all -->
        <RouterLink v-if="state.showAllJobs" to="#"
            class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            @click.prevent="state.showAllJobs = false">
            Show Less
        </RouterLink>
    </section>
</template>

<style scoped>
/* Add custom styles here if needed */
</style>
