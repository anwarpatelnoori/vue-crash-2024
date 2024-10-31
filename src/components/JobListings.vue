<script setup>
// import { ref, defineProps, onMounted } from 'vue';
import { reactive, defineProps, onMounted } from 'vue';
import SingleJobListing from './SingleJobListing.vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios'

// using ref
// const jobs = ref([])
// onMounted(async ()=>{
//     try{
//         const response = await axios.get('http://localhost:5000/jobs')
//         jobs.value = response.data;
//     }
//     catch(error){
//         console.log(error);   
//     }
// })

// using reactive 
const state = reactive({
    jobs:[],
    isLoading:true
})
onMounted(async ()=>{
    try{
        const response = await axios.get('api/jobs')
        state.jobs = response.data;
    }
    catch(error){
        console.log(error);   
    }finally{
        state.isLoading =false
    }
})
// console.log(jobs.value);
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
                <!-- // using ref -->
                <!-- <SingleJobListing v-for="job in jobs.slice(limit || job.length)" :key="job.id" :job="job" /> -->

                <!-- using reactive -->
                <SingleJobListing v-for="job in state.jobs.slice( limit || state.jobs.length)" :key="job.id" :job="job" />
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View All
            Jobs</RouterLink>
    </section>

</template>