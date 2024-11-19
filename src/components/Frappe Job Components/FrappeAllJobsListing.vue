<script setup>
import { reactive, defineProps, onMounted } from 'vue';
import FrappeSingleJobListing from './FrappeSingleJobListing.vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import frappe_api_key from '@/utils/frappe_api_keys';
// import frappe_api_key_2 from '@/utils/frappe_api_key';

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
    "company",
    "custom_company_email",
    "custom_company_phone",
    "custom_company_description",
];
const job_fields_json = encodeURIComponent(JSON.stringify(job_fields));

// Fetch jobs data on component mount
onMounted(async () => {
    const user_frappe_api = JSON.parse(localStorage.getItem('formData'));
    console.log('From User',user_frappe_api);
    try {
        const response = await frappe_api_key.get(`/Job Opening?fields=${job_fields_json}`);
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
            </div>

            <!-- Show job listings when loading is done -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FrappeSingleJobListing
                    v-for="job in (state.showAllJobs ? state.jobs : state.jobs.slice(0, limit))"
                    :key="job.name"
                    :job="job"
                />
            </div>
        </div>
    </section>

    <!-- Section for View All or Show Less button -->
    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <!-- Show "View All Jobs" button if not showing all -->
        <RouterLink
            v-if="!state.showAllJobs"
            to="#"
            class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            @click.prevent="state.showAllJobs = true"
        >
            View All Jobs
        </RouterLink>
        <!-- Show "Show Less" button if showing all -->
        <RouterLink
            v-if="state.showAllJobs"
            to="#"
            class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            @click.prevent="state.showAllJobs = false"
        >
            Show Less
        </RouterLink>
    </section>
</template>

<style scoped>
/* Add custom styles here if needed */
</style>
