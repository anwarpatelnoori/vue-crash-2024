<script setup>
// import { ref, defineProps, onMounted } from 'vue';
import { reactive, defineProps, onMounted } from 'vue';
import FrappeSingleJobListing from './FrappeSingleJobListing.vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios'


// using reactive 
const state = reactive({
    jobs:[],
    isLoading:true
})

// From frappe jobs
const headers = {
    'Authorization': 'Token 4caa1fb44962403:c9ffde8c1961297',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  const job_fields = ["name","employment_type","designation", "job_title", "description", "location", "lower_range", "upper_range","company","custom_company_email","custom_company_phone","custom_company_description"];
  const job_fields_json = encodeURIComponent(JSON.stringify(job_fields))
onMounted(async ()=>{
    try{
        const response = await axios.get(`http://localhost:8001/api/resource/Job Opening?fields=${job_fields_json}`,{ headers })
        state.jobs = response.data.data;
        console.log(state.jobs);   
    }
    catch(error){
        console.log(error);   
    }
    finally{
        state.isLoading=false
    }
})
defineProps({
    limit: {
        type: Number,
        default: "0"
    },
    showButton: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <!-- Show Loading spinner while loading is true -->
             <div v-if="state.isLoading" class="text-center tex-gray-500 py-6">
                <PulseLoader/>
             </div>

            <!-- Shoe job listing when loading is done -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- using reactive -->
                <FrappeSingleJobListing v-for="job in state.jobs.slice( limit || state.jobs.length)" :key="job.name" :job="job" />
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View All
            Jobs</RouterLink>
    </section>

</template>