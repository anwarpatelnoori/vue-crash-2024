<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  job: Object
})
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
};
</script>

<template>
  <!-- Job Listing 1 -->
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ job.employment_type }}</div>
        <h3 class="text-xl font-bold">{{ job.job_title }}</h3>
      </div>
      <h3 class="text-green-500 mb-2">Min: {{ formatCurrency(job.lower_range) }} / Year</h3>
      <h3 class="text-green-500 mb-2">Max: {{ formatCurrency(job.upper_range) }} / Year</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-map-marker text-orange-700 "></i>
          {{ job.location }}
        </div>
        <RouterLink :to="'/frappe-jobs/' + job.name"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>