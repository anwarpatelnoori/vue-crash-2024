<script setup>
import FrappeBackButton from '@/components/Frappe Job Components/FrappeBackButton.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import frappe_api_key from '@/utils/frappe_api_keys';
import frappe_api_key_2 from '@/utils/frappe_api_keys';


const route = useRoute();
const router = useRouter()
const toast = useToast()

const jobId = route.params.name

const state = reactive({
    job: {},
    isLoading: true
})
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
};
const deleteJob = async () => {
    try {
        const confirm = window.confirm('Are you sure want to delete the job')
        if (confirm) {
            // hardcode api
            // await frappe_api_key.delete(`/Job Opening/${jobId}`)
            // dynamic api from local storage
            const call_frappe_api = frappe_api_key_2()
            await call_frappe_api.delete(`/Job Opening/${jobId}`)
            toast.success('Job Deleted Successfully')
            router.push('/jobs/view-frappe-all-jobs')
        }
    } catch (error) {
        console.error('Error while deleting', error)
        toast.error('Unable to Delete')
    }

}
const job_fields = ["name", "employment_type", "designation", "job_title", "description", "location", "lower_range", "upper_range", "company", "custom_company_email", "custom_company_phone", "custom_company_description"];
const job_fields_json = encodeURIComponent(JSON.stringify(job_fields))
onMounted(async () => {
    try {
        // hardcode api
        // const response = await frappe_api_key.get(`/Job Opening?filters=[["name","=","${jobId}"]]&fields=${job_fields_json}`)

        // dynamic api from local storage
        const call_frappe_api = frappe_api_key_2()
        const response = await call_frappe_api.get(`/Job Opening?filters=[["name","=","${jobId}"]]&fields=${job_fields_json}`)

        if (response.data.data.length > 0) {
            state.job = response.data.data[0]
        }
        else {
            console.log('No job found with the given name.');
            toast.info('No job found with the given name.');
        }
        state.job = response.data.data[0];
        console.log(state.job);

    }
    catch (error) {
        console.log('Error Fetching Job', error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        toast.error('Unable to fetch job details.');
    }
    finally {
        state.isLoading = false
    }
})
</script>
<template>
    <FrappeBackButton />
    <section v-if="!state.isLoading" class="bg-green-50">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-500 mb-4">{{ state.job.employment_type }}</div>
                        <h1 class="text-3xl font-bold mb-4">{{ state.job.job_title }}</h1>
                        <p class="font-bold mb-2">Department: {{ state.job.designation }}</p>
                        <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                            <i class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                            <p class="text-orange-700">{{ state.job.location }}</p>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-green-800 text-lg font-bold mb-6">
                            Job Description
                        </h3>

                        <!-- Use v-html directive to render the description as HTML -->
                        <div class="mb-4" v-html="state.job.description"></div>
                        <!-- <p class="mb-4">
                            {{ state.job.description }}
                        </p> -->


                        <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>
                        <p class="mb-4">{{ formatCurrency(state.job.lower_range) }} / Year</p>
                        <p class="mb-4">{{ formatCurrency(state.job.upper_range) }} / Year</p>
                    </div>

                </main>

                <!-- Sidebar -->
                <aside>
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>

                        <h2 class="text-2xl">{{ state.job.company }}</h2>

                        <p class="my-2">
                            {{ state.job.custom_company_description }}
                        </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Contact Email:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold">
                            {{ state.job.custom_company_email }}
                        </p>

                        <h3 class="text-xl">Contact Phone:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold">{{ state.job.custom_company_phone }}</p>
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <RouterLink :to="`/frappe-jobs-edit/${state.job.name}`"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Edit
                            Job</RouterLink>
                        <button @click="deleteJob"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Job
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
    <div v-else="state.isLoading" class="text-center tex-gray-500 py-6">
        <PulseLoader />
    </div>
</template>

<style>
/* CSS for your component, including external styles */
@import "https://cdn.quilljs.com/1.3.6/quill.snow.css";

.ql-editor.read-mode ol {
    list-style-type: disc !important;
    padding-left: 40px;
}
</style>